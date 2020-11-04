//now to create the schema ,you need to require it.Whenever we require any mongoose schema,mongoose will execute and create
//it in mongoDb so make sure you only do require of each schema only once coz suppose if you have done require of schema at
//more than one place (may be in more than one file) then you will get error mesg schema is already created you cannot define it again
require('./src/models/User');
require('./src/models/Track');
const express =require('express');
const mongoose=require('mongoose');
const authRoutes=require("./src/routes/authRoutes");
const trackRoutes=require("./src/routes/trackRoutes");

const requireAuth=require("./src/middlewares/requireAuth");

//To handle incoming info from body of req:-
const bodyParser=require('body-parser');

const app=express();

//to parse json data
app.use(bodyParser.json());
//Also make sure app.use(bodyParser.json()); is written prior to app.use(authRoutes) or app.use(anyRouteFiles);
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI="mongodb+srv://admin:myfirstuser@cluster0.pv93w.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo Instance");
});

mongoose.connection.on('error',(err)=>{
    console.log("Error Connectiong to mongo",err);
});

app.get('/',requireAuth,(req,res)=>{
    res.send(`Your Email:- ${req.user.email}`);
})

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})