const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyparser = require('body-parser');
const index = fs.readFileSync('../anewweb/index.html');
const register = fs.readFileSync('../anewweb/register.html');
const login = fs.readFileSync('../anewweb/signin.html');
const home = fs.readFileSync('../anewweb/home1.html');
const DB ="mongodbsrv://Samiullah67:Sami888+@node app.i7h4zx5.mongodb.net/app?retryWrites=true&w=majority"
const app = express();
const port = process.env.PORT;
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});
const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    password1:{
        type:String,
        required:true,
    }
});
const Appp = new mongoose.model("Appp",Schema);
app.get("/",(req,res)=>{
    res.end(index);
});
app.get("/register",(req,res)=>{
    res.end(register);
});
app.post("/register",(req,res)=>{
    const data = new Appp(req.body);
    data.save().then(()=>{
        res.end(login);
    }).catch((err)=>{
        res.end("this email is already registered")
    });
});
app.get("/login",(req,res)=>{
    res.end(login);
});

});
app.post("/login", async(req,res)=>{
    const mail = req.body.email;
    const pass = req.body.password1;
    if((mail!="")&&(pass!="")){
          const ress = await Appp.find({email:mail,password:pass});
          if(ress!=""){
            console.log(ress);
            res.end(home);
          }
          else{
            res.end("invalid login details");
          }
    }
    else{
        res.end("Please try again there is a problem");
    }
})
app.listen(port,()=>{
    console.log("server running");
