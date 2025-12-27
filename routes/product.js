

const express=require('express');
const allproduct=express.Router();
const {Hamaradd,Hamarupdate,Hamardelete,Hamarsabdata,Hamarsingle, Hamarsearch, Hamarcart,findallitem,removeCartItem}=require('../controller/product');
const isseller=require('../middleware/isseller')
const isauth=require("../middleware/isauth");
const allauthroutes = require('./allauth');

allproduct.post("/addproduct",isauth,isseller,Hamaradd);
allproduct.put("/update/:id",isauth,isseller,Hamarupdate);
allproduct.delete("/delete/:id",isauth,isseller,Hamardelete);
allproduct.get("/alldata",isauth,Hamarsabdata);
allauthroutes.get('/singlevalue/:id',isauth,Hamarsingle);
allauthroutes.get("/search",isauth,Hamarsearch);
allauthroutes.post('/addcart/:id',isauth,Hamarcart);
allauthroutes.get('/allcart',isauth,findallitem);
allauthroutes.delete("/deletecart/:id",isauth,removeCartItem);

module.exports=allproduct;
