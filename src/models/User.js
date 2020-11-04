const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//what pre means is execute following written function before saving the user instance in db
//Also make sure to use function(){} instead of arrow function ()=>{} coz as we know value referred using this keyword in function and in arrow function
//has different meaning.You can google it or can see web dev simplified for more info
userSchema.pre('save',function(next){
    //this keyword will give us the current user instance
    const user=this;
    // console.log("user in pre= "+user);
    //checking if user is signing up or is logging in
    if(!user.isModified('password')){
        // console.log("Inside 1");
        //if user is logging in
        return next();
    }
    //else if user is signing up then:- 
    bcrypt.genSalt(10,(err,salt)=>{
        // console.log("Inside 2");
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            else{
                user.password=hash;
                next();
            }
        });
    })
});

//Also make sure to use function(){} instead of arrow function ()=>{} coz as we know value referred using this keyword in function and in arrow function
//has different meaning.You can google it or can see web dev simplified for more info
userSchema.methods.comparePassword=function(userPassword){
    const user=this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(userPassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err);
            }
            if(!isMatch){
                return reject(false);
            }
            resolve(true);
        })
    });
    
}

mongoose.model('User',userSchema);