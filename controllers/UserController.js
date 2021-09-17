
const {Account} = require('../models/account');




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


module.exports = {
    getTotalUser,
    deleteUser
}