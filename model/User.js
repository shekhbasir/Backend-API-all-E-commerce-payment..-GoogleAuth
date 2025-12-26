//here i am going to writent the  code for user information and from ere onlu=y the all operation will going to work 


const mongoose=require('mongoose');


const Hamaruser=new mongoose.Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true,
    enum:["buyer","seller","servicer"],
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  }
  
},{timestamps:true});

const Userdatabase=mongoose.model("Userdatabase",Hamaruser);
module.exports=Userdatabase;

//lets see the all task from here 