//here i am going to wrintg the code for the profile img 

const express=require('express');
const mongoose=require('mongoose');

const Hamarprofile=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true
  },
  phone:{
    type:Number
  },
  bio:{
    type:String,

  },
  profileimg:{
    type:String
  }
},{timestamps:true});

const profiledatabase=mongoose.model("profiledatabase",Hamarprofile);
module.exports=profiledatabase;
// form here i am going  to use the thing's 