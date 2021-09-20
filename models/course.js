const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    nama_Course: {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    create_date: {
        type: Date,
        default:Date.now
    },
    update_date:{
        type: Date,
        default:Date.now
    },
    category_Id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'course_Category'
    },
    banner :{
        type: String,
        required: true,
        
    },
    cloudinary_Id : {
        type: String,
        required: true,
    },
})
const Course = mongoose.model('course', CourseSchema);

module.exports = {Course}