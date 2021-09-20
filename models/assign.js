const mongoose = require('mongoose');

const AssignSchema = new mongoose.Schema({
    account_Id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'account'
    },
    tutor: {
        type: Boolean,
        required: true,
    },
    course_Id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'course'
    },
    status:{
        type: Number,
        required:true
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
const Assign = mongoose.model('assign', AssignSchema );

module.exports = {Assign}