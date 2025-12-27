//here i am goig to making the api for all the product related jobs 
const mongoose=require("mongoose")
const ProductDatabase=require("../model/product")
const Cartdatabase=require("../model/cart");
const Hamaradd=async(req,res)=>{
  try {
    const {name,description,price,discountprice,discountpercentage,catogery,brand,stock,photo,rating,review,reviewcount}=req.body;
    //by the help of this it will going to handle all the things 
    
    const sabdata=await ProductDatabase.create({
      name,description,price,discountprice,discountpercentage,catogery,brand,stock,photo,rating ,review,reviewcount
    });

    return res.status(200).json({message:"Data added To makemysite ...!",sabdata})
    

  } catch (error) {
    return res.status(500).json({message:"error from the add your product ...!"});
  }
}



const Hamarupdate = async (req, res) => {
  try {
    const updateid = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(updateid)) {
      return res.status(400).json({
        message: "Invalid product id"
      });
    }

    const updatebhail = await ProductDatabase.findByIdAndUpdate(
      updateid,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatebhail) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Successfully Updated",
      product: updatebhail
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error.message);
    return res.status(500).json({
      message: "error from the update data"
    });
  }
};


const Hamardelete=async(req,res)=>{
  try {
    const hamarid=req.params.id;

    const deleting=await ProductDatabase.findByIdAndDelete(hamarid);

    if(!deleting){
      return res.status(400).json({message:"data not found for deleting ...!"});
    }

     return res.status(200).json({message:"data deleted succesfully ...!"});
  } catch (error) {
     return res.status(500).json({message:"error will generated from the deleting task "});
  }
}
//here i am going to wrintg the code for finding the all data 

const Hamarsabdata=async(req,res)=>{
  try {
    const alldata=await ProductDatabase.find();
    if(alldata.length===0){
      return res.status(400).json({message:"no data will going to find ...!"});
    }

    return res.status(200).json({message:"Your All Data ",alldata});
  } catch (error) {
    return res.status(500).json({message:"error from the finding all data "})
  }
}


//here i am going to wrintg the code for the geting single product 
const Hamarsingle=async(req,res)=>{
  try {
    const hamarid=req.params.id;
    if(!hamarid){
      return res.status(400).json({message:"id not Found ...!"});
    }

    const singledata=await ProductDatabase.findById(hamarid);

    return res.status(200).json({message:"your details ",singledata})
  } catch (error) {
    return res.status(500).json({message:"errror from the singlevalue "})
  }

}

//here i am going to finding the searching api
const Hamarsearch=async(req,res)=>{
  try{
    const {keyword}=req.query;
    if(!keyword){
      return res.status(400).json({message:"plz Enter Valid search Keyword"});
    }

    //now agar valid
    const searchproduct=await ProductDatabase.find({
      $or:[{name:{$regex:keyword,$options:"i"}},
        {description:{$regex:keyword,$options:"i"}},
        {brand:{$regex:keyword,$options:"i"}}
      ]
    });

    //now ab check kar dehm
    if(searchproduct.length===0){
      return res.status(404).json({message:"Item Not Found ..!"})
    }

    return res.status(200).json({message:"Your Items ",searchproduct})



  }catch(error){
    return res.status(500).json({message:"error from the Searching api"})
  }

}




const Hamarcart = async (req, res) => {
  try {
    const userId=req.userid;
    const productId = req.params.id;

    const product = await ProductDatabase.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let hamdat = await Cartdatabase.findOne({ userId });

    // agar cart nahi hai to naya banao
    if (!hamdat) {
      hamdat = new Cartdatabase({ userId, items: [], totalPrice: 0, totalItems: 0 });
    }

    // check product already in cart
    const itemIndex = hamdat.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // already exists → quantity increase
      hamdat.items[itemIndex].quantity += 1;
    } else {
      // new product → push
      hamdat.items.push({
        productId: productId,
        quantity: 1,
        price: product.price
      });
    }

    // 🔄 recalculate totals
    hamdat.totalItems = 0;
    hamdat.totalPrice = 0;

    hamdat.items.forEach(item => {
      hamdat.totalItems += item.quantity;
      hamdat.totalPrice += item.quantity * item.price;
    });

    await hamdat.save();

    return res.status(200).json({
      message: "Item added to cart",
      hamdat
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error in add to cart",
      error
    });
  }
};


const findallitem=async(req,res)=>{
  try {
    const userId=req.userid;
    const allval=await Cartdatabase.findOne({userId}).populate("items.productId");

    if(allval.items.length===0){
      return res.status(400).json({message:"Cart Is Empty ..!"})
    }

    const proid=await allval.items.productId;

    return res.status(200).json({message:"the all cart item",allval});
  } catch (error) {
    return res.status(500).json({message:"Error from the findallitem"})
  }
}

const removeCartItem = async (req, res) => {
  try {
    const userId = req.userid;
    const productId = req.params.productId;

    const cart = await Cartdatabase.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newItems = [];

    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].productId.toString() !== productId) {
        newItems.push(cart.items[i]);
      }
    }

    cart.items = newItems;

    cart.totalItems = 0;
    cart.totalPrice = 0;

    for (let i = 0; i < cart.items.length; i++) {
      cart.totalItems += cart.items[i].quantity;
      cart.totalPrice += cart.items[i].quantity * cart.items[i].price;
    }

    await cart.save();

    return res.status(200).json({
      message: "Item deleted from cart",
      cart
    });

  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    return res.status(500).json({
      message: "Error deleting cart item",
      error: error.message
    });
  }
};

module.exports={Hamaradd,Hamarupdate,Hamardelete,Hamarsabdata,Hamarsingle,Hamarsearch,Hamarcart,findallitem,removeCartItem};


//ab main simply jake apan akaam kar sakta huu and the data fetch 

//i am goin to creating the task in which the 