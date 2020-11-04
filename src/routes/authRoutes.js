const express = require('express');
const router = express.Router();

//To access User Model:- 
const mongoose=require('mongoose');
const User=mongoose.model('User');

const jwt=require('jsonwebtoken');

router.post('/signup',async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user=new User({email,password});
        // console.log("Got= "+user);
        //user.save() will save the data in mongoDb and its an async operation.So we will use async await for it.
        await user.save();
        const token=jwt.sign({userId:user._id},"MY_SECRET_KEY");
        // res.send({token:token}); or
        res.send({token});
    }
    catch(e){
        // console.log("Err= "+e);
        res.status(422).send("Something Went Wrong");
    }
});

router.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).send("Must provide Email and Password");
    }
    const user =await User.findOne({email});
    if(!user){
        return res.status(422).send({error:"Email not Found."});
    }
    try{
        //as comparePassword also return promise to need await keyword before its call
        await user.comparePassword(password);
        const token = jwt.sign({userId:user._id},"MY_SECRET_KEY");
        res.send({token});
    }
    catch(e){
        // console.log("Catch "+e);
        res.status(422).send({error:"Invalid Password."});
    }
})

module.exports=router;