const {Course_Category} = require('../models/course_Category')

const getAllCategory = async (req,res,next) =>{
    Course_Category.find({}, (err,dataCategory)=>{
        if(!err){
            res.json({
                data: dataCategory
            })
        }else{
            console.log(err)
        }
    })
}


const addCategory = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    var category = new Course_Category(
        {
            nama_Category:req.body.nama_Category,
            rate:req.body.rate,
            create_Date:Date.now(),
            update_date :null

        }
    );
 
    category.save( (err) => {
        if(!err){
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.send(err)
        }
    });
}

const getFavoriteCategory = async (req,res,next) =>{
    Course_Category.find({}, (err,dataCategory)=>{
        if(!err){
            res.json({
                data: dataCategory
            })
        }else{
            console.log(err)
        }
    }).sort({rate:-1})
}


const updateCategory = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    let query = {"_id": req.params.id}
    let category =
        {
            nama_Category: req.body.nama_Category,
            rate:req.body.rate,
            update_date :Date.now()

        }
    
        Course_Category.findByIdAndUpdate(query, {$set: category}, {new:true}, function (err,data){
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
    getAllCategory,
    addCategory,
    getFavoriteCategory,
    updateCategory
}