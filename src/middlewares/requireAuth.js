const mongoose=require('mongoose');
const User=mongoose.model('User');

const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    //we have to put  key authorization and its value will be 'Bearer '+user's jwt
    const {authorization}=req.headers;
    //checking if header includes authorization key
    if(!authorization){
        return res.status(401).send({error:"You Must be Logged In."});
    }
    if(authorization.search("Bearer ")===-1){
        return res.status(401).send({error:"You Must be Logged In."});
    }
    const token = authorization.replace('Bearer ','');
    jwt.verify(token,'MY_SECRET_KEY',async (err,payload)=>{
        //payload will be whatever you have stored in jwt,in our case its user._id coz in authRoutes.js we have wrote:-
        // const token=jwt.sign({userId:user._id},"MY_SECRET_KEY");
        if(err){
            return res.status(401).send({error:"You Must Be Logged In"});
        }
        const {userId} = payload;
        const user=await User.findById(userId);
        req.user=user;
        next();
    });
     
}