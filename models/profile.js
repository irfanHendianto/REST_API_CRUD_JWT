const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    place_Of_Birth : {
        type: String,
        required: true,
    },
    date_Of_Birth: {
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
    account_Id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'accounts'
    }
})
const Profile = mongoose.model('profile', ProfileSchema);

module.exports = {Profile}