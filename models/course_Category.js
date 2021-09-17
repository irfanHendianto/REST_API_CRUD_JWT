const mongoose = require('mongoose');
const course_CategorySchema = new mongoose.Schema({
    nama_Category: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    create_date: {
        type: Date,
        default:Date.now
    },
    update_date:{
        type: Date,
        default:Date.now
    }
})
const Course_Category = mongoose.model('course_Category', course_CategorySchema );

module.exports = {Course_Category}