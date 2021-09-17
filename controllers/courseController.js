const {Course} = require('../models/course')
const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');


const addCourse = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    const uploadBanner = await cloudinary.uploader.upload(req.file.path);
    var course = new Course(
        {
            nama_Course:req.body.nama_Course,
            price:req.body.price,
            duration:req.body.duration,
            description:req.body.description,
            create_Date:Date.now(),
            update_date :null,
            category_Id: req.body.category_Id,
            banner: uploadBanner.secure_url,
            cloudinary_Id: uploadBanner.public_id
            
        }
        );
        course.save(err =>{
            if(!err){
                res.status(200).json({
                    message: 'success !',
                });
            }else{
                res.send(err)
            }
         });
       
}

const getAllCourse = async (req,res,next) =>{
    Course.find({}, {nama_Course:1}, (err,dataCourse)=>{
        if(!err){
            res.json({
                data: dataCourse
            })
        }else{
            res.send(err)
        }
    })

}

const getDetailCourses = async (req,res,next) =>{

      const idToSearch = mongoose.Types.ObjectId(req.params.id)

      Course.aggregate([
        { $match : {_id: idToSearch}},
        {
          $lookup: {
            from: "course_categories",
            localField: "category_Id",
            foreignField: "_id",
            as: "category_Id",
          },
        },
        {
          $unwind: "$category_Id",
        },
      
      ])
        .then((result) => {
            res.json({
                data: result
            })
        })
        .catch((error) => {
            res.send(error)
        });
}


const updateCourse = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    
    let {cloudinary_Id,banner} = await Course.findOne({_id: req.params.id},{cloudinary_Id:1,banner:1,_id:0})
    let image = req.file || ""
    let  uploadBanner;
    let query = {"_id": req.params.id}
    if(image){ 
        let delete_Banner = await cloudinary.uploader.destroy(cloudinary_Id);
        uploadBanner = await cloudinary.uploader.upload(image.path);
    }else {
        uploadBanner = {
            secure_url : banner,
            cloudinary_Id : cloudinary_Id
        }
    }
    var course = (
        {
            nama_Course:req.body.nama_Course,
            price:req.body.price,
            duration:req.body.duration,
            description:req.body.description,
            update_date :Date.now(),
            category_Id: req.body.category_Id,
            banner: uploadBanner.secure_url,
            cloudinary_Id: uploadBanner.public_id
 
        }
    );
    Course.findByIdAndUpdate(query, {$set: course}, {new:true}, function (err,data){
        if(!err){
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.send(err)
        }
    });
}

const deleteCourses = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    let query = {"_id": req.params.id}

    Course.findByIdAndDelete(query, {new:true}, async (err,data) =>{
        if(!err){
            console.log(data.cloudinary_Id)
            let delete_Banner = await cloudinary.uploader.destroy(data.cloudinary_Id);
            res.status(200).json({
                message: 'success !',
            });
        }else{
            res.send(err)
        }
    });
}

const getTotalCourses = async (req,res,next) =>{
    if(!req.user.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }
    try{
        let total_data_free = await  Course.find({price: 0}).count()
        let total_Data = await Course.countDocuments()
        res.status(200).json({
            total_Data: total_Data,
            total_data_free : total_data_free
        });
    }catch(err){
        res.send(err)
    }
}

const sortingData = async (req,res,next) =>{
    // type_Sort = 1 Ascending and -1 Descending
    // type_Price = false Free and true = Not Free
    try {
        let type_Sort = req.query.type || 1
        let type_Price = req.query.price || "true"
        let data;
        if(type_Price === "true"){
            data = await Course.find({price :{ $ne : 0}}).sort({price: parseInt(type_Sort)})
        }else{
            data = await Course.find({price : 0})
        }
        res.status(200).json({
            data: data,
        });
    } catch (error) {
        res.send(error)
    }
}

const searchCourses = async (req,res,next) =>{
    Course.find({ nama_Course : { '$regex' : req.params.nama, '$options' : 'i' } }, (err,dataCourse)=>{
        if(!err){
            res.json({
                data: dataCourse
            })
        }else{
            res.send(err)
        }
    })
}

module.exports = {
    getAllCourse,
    addCourse,
    getDetailCourses,
    updateCourse,
    deleteCourses,
    getTotalCourses,
    sortingData,
    searchCourses
}