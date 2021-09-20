const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    admin: {
        type: Boolean,
        required: true,
    },
    status : {
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
    },
    tutor: {
        type: Boolean,
        required: true
    }
})
const Account = mongoose.model('account', AccountSchema);

module.exports = {Account}