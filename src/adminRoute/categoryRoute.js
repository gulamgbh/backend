const express = require('express');
const router = express.Router();
const { createCategory, getCategory } = require('../../controllers/adminAPI/categoryController');
const { requireSignin, adminMiddleware } = require('../../middlewares/commonMiddlewares');
const shortId = require('shortid')
const path = require('path')
const multer = require('multer')

// ------------Multer Config--------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortId.generate() + '-' + file.originalname)
    }
})

const uploads = multer({ storage })
router.post('/category/create-category',requireSignin, adminMiddleware,uploads.single('featuredImg'), createCategory)
router.get('/category/get-category', getCategory)
// router.post('/admin/signin', validaterSigninReq, isRequestValidated, signin)

module.exports = router