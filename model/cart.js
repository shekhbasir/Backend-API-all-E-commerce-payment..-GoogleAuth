//here i am going to wrting the code for the cart
const mongoose=require('mongoose');


const Hamarcartschema=new mongoose.Schema({
  itemid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ProductDatabase"
  },
  totalitem:{
    type:Number
  },
  totalprice:{
    type:Number,
  },



},{timestamps:true})

const Cartdatabase=mongoose.model("Cartdatabase",Hamarcartschema)
module.exports=Cartdatabase