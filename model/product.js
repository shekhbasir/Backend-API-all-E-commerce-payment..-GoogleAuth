// i am going to desgining the product items 

const mongoose=require('mongoose');
const express=require('express');


const Hamarproduct=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  discountprice:{
    type:Number,
  },

  discountpercentage:{
    type:Number,
  },
  catogery:{
    type:String,
  },
  brand:{
    type:String
  },
  stock:{
    type:Number,
  },
  photo:{
    type:String,

  },
  rating:{
    type:Number,
  },

  review:{
    type:String,

  },
  reviewcount:{
    type:Number
  }
})

const ProductDatabase=mongoose.model("ProductDatabase",Hamarproduct);
module.exports=ProductDatabase;

//by the help of this data base i am going to making the routes for adding this all things and saving in the database and many more 