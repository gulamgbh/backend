const express = require('express');
const router = express.Router();
const { createUser, signin, signout, findAllUsersData, updateStatusById, updateIsDeleteById } = require('../../controllers/adminAPI/authController');
const { isRequestValidated, validaterSigninReq, validaterCreateUserReq } = require('../../validators/authValidate');
const { requireSignin } = require('../../middlewares/commonMiddlewares');


router.post('/admin/create-user', validaterCreateUserReq, isRequestValidated, createUser)
router.post('/admin/signin', validaterSigninReq, isRequestValidated, signin)
router.post('/admin/signout',requireSignin , signout)
router.get('/admin/findAllUsers' , findAllUsersData)
router.post('/admin/status' , updateStatusById)
router.post('/admin/softdelete' , updateIsDeleteById)
// router.post('/admin/profile',  (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router