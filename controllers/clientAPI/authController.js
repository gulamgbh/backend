const User = require('../../models/userSchema');
var randomstring = require("randomstring");
const bcrypt = require('bcryptjs');

// Customer Register API
exports.signup = (req, res) => {
    const { first_name, last_name, email, contact_number, occupation, password, confirm_pwd } = req.body;
    if (!first_name || !last_name || !email || !contact_number || !password || !confirm_pwd) {
        return res.status(422).send({ message: "plz filled the field properly" });
    }
    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            return res.status(422).send({ message: "Email Already registerd" });
        } else if (password !== confirm_pwd) {
            return res.status(422).send({ message: "Your password and confirmation password do not match." });
        } else {
            const user = new User({ first_name, last_name, user_name: first_name + "_" + randomstring.generate(4), email, contact_number, occupation, password });
            user.save().then(() => {
                res.status(201).send({ message: "User registerd successfully" });
            }).catch((err) => res.status(422).send({ message: "Failed to registerd" }));
        }
    }).catch((error) => { res.status(422).send(error.message ) });
}

// Customer Login API
exports.signin =async (req, res) => {
    try {
        const { email, _password } = req.body;
        if (!email || !_password) {
            return res.status(400).json({ error: "plz filled the field properly" });
        }
        const user_info = await User.findOne({ email: email });
        if (user_info && user_info.role === 'customer') {
            const isMatch = await bcrypt.compare(_password, user_info._password);
            const token = await user_info.generateAuthToken();
            const user_id = user_info._id;
            res.cookie('user_token', token, { expiresIn: '5h' })
            res.cookie('user_id', user_id, { expiresIn: '5h' })
            const { _id, firstname, lastname, fullname, email, role } = user_info;
            if (!isMatch) {
                res.status(400).json({ message: "Invalid Credential" });
            } else {
                res.json({ _id, token, data: { _id, firstname, lastname, fullname, role, email }, message: "user signin successfully" });
            }
        } else {
            res.status(400).json({ message: "Invalid Credential..." });
        }
    } catch (error) {
        res.status(400).json( error.message );
    }
}