const {Account} = require('../models/account');
const {Profile} = require('../models/profile');
const {Assign} = require('../models/assign');
const mongoose = require('mongoose');
const nodemailer = require('../utils/nodemailer.js');

const getTotalUser = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    try{
        let total_Data_User = await  Account.find({status: 1}).count()
        res.status(200).json({
            total_User: total_Data_User,
        });
    }catch(err){
        res.send(err)
    }
  
}

const deleteUser = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    let query = {"_id": req.params.id}
    var user = (
        {
            status: 2,
            update_date :Date.now(),
        }
    );
    Account.findByIdAndUpdate(query, {$set: user}, {new:true}, function (err,data){
        if(!err){
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.send(err)
        }
    });
}

const assignAdmin = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    let query = {"_id": req.params.id}
    var user = (
        {
            admin: true,
            update_date :Date.now(),
        }
    );
    Account.findByIdAndUpdate(query, {$set: user}, {new:true}, function (err,data){
        if(!err){
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.send(err)
        }
    });
}
 
const assignTutor = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    let query = {"_id": req.params.id}
    var user = (
        {
            tutor: true,
            update_date :Date.now(),
        }
    );
    Account.findByIdAndUpdate(query, {$set: user}, {new:true}, function (err,data){
        if(!err){
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.send(err)
        }
    });
}

const getAllTutor = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
     await Account.aggregate([
        // Do the first join
        { $match: {tutor: true} },
        { $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "account_Id",
            as: "account_info"
        }},
    
        // $unwind the array to denormalize
        { $unwind: "$account_info" },
        { $project: { "account_info.nama": 1 } }
    ]).then((result) => {
        res.json({
            data: result
        })
    })
    .catch((error) => {
        res.send(error)
    });
}



const sendEmailFuntion = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    nodemailer.sendMail(req.body, async(err,success) =>{
        if(!err){
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.status(400).send(error)
        }
    })

}

const getEmailUser = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    await Profile.find({},{nama:1}).populate({ path: 'account_Id', select: 'email' })
    .then(result =>{
        res.status(200).json({
            data: result
        });
    })
    .catch(
        (err) => { res.status(404).send(err)}
    );
   
}
const AssignTutorForhistory = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    var assign = new Assign(
        {
            account_Id:req.params.id,
            tutor:true,
            course_Id:req.body.course_Id,
            status: 3,
            create_Date:Date.now(),
            update_date :null,  
        }
    );
    assign.save(err =>{
        if(!err){
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.send(err)
        }
    });
       
   
}


const getDetailUser = async (req,res,next) =>{
    const idToSearch = mongoose.Types.ObjectId(req.params.id)
    try {
        const profile_user = await Profile.find({account_Id: idToSearch}).populate({ path: 'account_Id', select: ['email','admin','tutor'] }).exec()
        res.status(200).json({
            data: profile_user,
        });
    } catch (error) {
        res.send(error)
    }

}

module.exports = {
    getTotalUser,
    deleteUser,
    assignAdmin,
    assignTutor,
    getAllTutor,
    sendEmailFuntion,
    getEmailUser,
    AssignTutorForhistory,
    getDetailUser
}