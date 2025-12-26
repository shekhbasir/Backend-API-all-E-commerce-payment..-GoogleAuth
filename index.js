const express=require('express');
const cookieparser=require('cookie-parser');
const cors=require('cors');
require('dotenv').config();
const session=require('express-session');
const app=express();
const Hamarconnection=require('./config/Dbconnect');
const allauthroutes=require('./routes/allauth');
const allproduct=require("./routes/product")


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieparser());


app.use("/auth",allauthroutes);
app.use("/auth",allproduct);

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
  Hamarconnection();
  console.log(`this is the link http://localhost:${PORT}`);
})



//and the task and simply task all i am going tworkin 