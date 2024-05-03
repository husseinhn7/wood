import mongoose from "mongoose";



const productSchema = mongoose.Schema({
   
name : String,
description : String,
sizes : String,
price : Number , 
rate : Number ,

})


const Product = mongoose.model("Product" , productSchema )



export default Product;