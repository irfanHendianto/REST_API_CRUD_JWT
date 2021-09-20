const {Account} = require('../models/account');
const {Profile} = require('../models/profile');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationInput} = require('../validation.js');



const register = async (req,res,next) =>{
    // Check Email And Password
    let check_Input = {
        email: req.body.email,
        password: req.body.password
    };
    const {error} = validationInput(check_Input);
    if(error) return res.status(400).send(error.details[0].message);

    //Check email and password
    const check_Email = await Account.findOne({email: req.body.email});
    if(check_Email) res.status(400).send("Email Already Exist !");
   
    // HASH PASSWORD
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt)


    let account = new Account(
        {
            email:req.body.email,
            password:hashPassword,
            admin: false,
            create_Date:Date.now(),
            update_date :null,
            status: 1,
            tutor: false,
            
        }
    );
    let profile = new Profile ({
        nama:req.body.nama,
        place_Of_Birth:req.body.place_Of_Birth,
        date_Of_Birth: req.body.date_Of_Birth,
        create_Date:Date.now(),
        update_date :null,
        account_Id: account._id
    })
    try {
        const saved_Account = await account.save(); 
        const saved_Profile = await profile.save();
        res.status(200).json({
            message: 'success !',
            account_id : account._id
        });
    } catch (error) {
        res.status(400).send(err);
    }
  
}

const login = async (req,res,next) =>{
    const {error} = validationInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    
    const check_user = await Account.findOne({email: req.body.email});
    if(!check_user) res.status(400).send("Email or password Not Exist !");
    
    const validPass =  await bcryptjs.compare(req.body.password,check_user.password)
    if(!validPass) res.status(400).send("Invalid Password !");
    
    const {nama} = await Profile.findOne({account_Id : check_user._id},{nama : 1, _id:0})
    
    const token = jwt.sign({
         _id : check_user._id,
         admin : check_user.admin,
         nama : nama 
    },
    process.env.TOKEN_SECRET
    )
    res.header('auth-token',token).send(token)
    
}

module.exports = {
    register,
    login
}