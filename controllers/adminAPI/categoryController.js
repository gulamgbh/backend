const generateslug = require('slugify');
const Category = require("../../models/categorySchema");



// Create categories controllers
exports.createCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: generateslug(req.body.name),
    }
    if (req.file) {
        categoryObj.featuredImg = process.env.BASE_URL + '/public/' + req.file.filename;
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const category = new Category(categoryObj);
    category.save().then(() => {
        res.status(200).send({ message: "Category created successfully...", category });
    }).catch((error) => res.status(400).send(error.message));
}

// ----------------Get all category-------------
function createCategories(response, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = response.filter(cat => cat.parentId == undefined);
    } else {
        category = response.filter(cat => cat.parentId == parentId);
    }
    for (let data of category) {
        categoryList.push({
            _id: data._id,
            name: data.name,
            slug: data.slug,
            parentId: data.parentId,
            children: createCategories(response, data._id),
        });
    }
    return categoryList;
}


exports.getCategory = async (req, res) => {
    await Category.find({}).then(function (response) {
        // handle success
        const categoryList = createCategories(response)
        res.status(200).send({ message: " Get all category successfully...", categoryList });
    }).catch(function (error) {
        // handle error
        res.status(400).send({ message: "Category name must be unique." }, error);
    })
}