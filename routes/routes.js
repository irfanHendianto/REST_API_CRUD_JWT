const express = require('express');
const router = express.Router();
const verify = require('./verifyToken.js');
const upload = require('../utils/multer');
const {getAllCategory,addCategory,getFavoriteCategory,updateCategory} =require('../controllers/courseCategoryController');
const {getAllCourse,addCourse,getDetailCourses,updateCourse,deleteCourses,getTotalCourses,sortingData,searchCourses} = require('../controllers/courseController')
const {register,login} = require('../controllers/AuthController');
const {getTotalUser,deleteUser} = require('../controllers/UserController');

// Auth
router.post('/auth/register',register)
router.post('/auth/login',login)

// User
router.get('/user/total',verify,getTotalUser)
router.put('/user/delete/:id',verify,deleteUser)

// Category
router.get('/category' ,verify,getAllCategory);
router.post('/category/add',verify,addCategory);
router.get('/category/favorite',verify,getFavoriteCategory)
router.put('/category/:id',verify,updateCategory);

// Course
router.post('/course/add',verify,upload.single("image"),addCourse);
router.get('/course',verify ,getAllCourse);
router.get('/course/detail/:id',verify, getDetailCourses);
router.put('/course/update/:id',verify ,upload.single("image") ,updateCourse);
router.delete('/course/delete/:id',verify ,deleteCourses);
router.get('/course/totalData',verify, getTotalCourses);
router.get('/course/sort',verify ,sortingData);
router.get('/course/search/:nama',verify ,searchCourses);



module.exports = {
    routes: router
}