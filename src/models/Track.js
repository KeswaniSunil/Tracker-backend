const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

//now pointSchema only makes sense when incldued in location field of track schema and isn't uesd independently anywhere else
//like track and user schema is used independently , so hence creating pointSchema here only i.e inside track model file

const pointSchema=new mongoose.Schema({
    timestamp:Number,
    coords:{
        latitude:Number,
        longitude:Number,
        altitude:Number,
        accuracy:Number,
        heading:Number,
        speed:Number
    }
});

const trackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        default:''
    },
    location:[pointSchema]
});

//as location will include array of objects where each obj will be of type pointSchma ,we declared it as:-
// location:[pointSchema]

mongoose.model('Track',trackSchema);
//now we only loaded track schema and not pointSchema is bcoz we will not have collections of point schema we will
//only have collection of track schema and inside location we will have point schema hence their is not need to create point schema separately