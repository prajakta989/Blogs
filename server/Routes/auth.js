const express= require('express');
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');

router.post('/register', async(req,res) =>{
    try{
        const {username, email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            username:username,
            email: email,
            password:hashedPass
        })
        const user  = await newUser.save();
        res.status(200).json(newUser);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Login

router.post('/login', async(req,res)=> {
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user){
            return res.status(400).json("Invalid Username or Password");
        }
         
        const validated= await bcrypt.compare(req.body.password, user.password);
        if(!validated){
           return res.status(400).json("Invalid Username or Password");
        }
        
        const {password, ...others} = user._doc;

        res.status(200).json(others);

    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;