const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Track=mongoose.model('Track');
const requireAuth=require("../middlewares/requireAuth");

//now to make user any user uses track services must be first signed it hence for that :-
router.use(requireAuth);

//now writing router.use(requireAuth); is same as writing requireAuth in each api call for eg:- 
// router.get('/tracks',requireAuth,async (req,res)=>{});
//so instead of specifying seperately in each one,we just wrote router.use(requireAuth); so that it will automatically be called
//before any api of this trackRoutes is requested

router.get('/tracks',async (req,res)=>{
    const tracks=await Track.find({userId:req.user._id}); 
    
    //tracks will be array of objects where each obj will be of Track type 
    res.send(tracks);
});

router.post('/tracks',async (req,res)=>{
    //for testingm,use this custome input:- 
    // {
    // 	"name":"My First Track",
    //     "location":[
    //         {
    //             "timestamp":10000,
    //             "coords":{
    //                 "latitude":100,
    //                 "longitude":200,
    //                 "altitude":150,
    //                 "accuracy":10,
    //                 "heading":41,
    //                 "speed":77
    //             }
    //         }
    //     ]
    // }

    const {name,location}=req.body;
    if(!name || !location){
        return res
                .status(422)
                .send({error:"You Must Provide a Name and Locations"});
    }
    try{
        const track=new Track({name,location,userId:req.user._id});
        await track.save();
        res.send(track);
    }
    catch(e){
        return res
                .status(422)
                .send({error:"Something Went Wrong"});
    }
});

module.exports=router;