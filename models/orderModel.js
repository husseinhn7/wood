import mongoose from "mongoose";




const order = mongoose.Schema({
    orderDate : {
        type : Date,
        default : Date.now()
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref  : "user" 
    },
    product :{
        type : mongoose.Schema.ObjectId,
        ref : "Product" 
    },
    status : {
        types : String,
        
    }
},  
    { 
    toJSON : { virtuals: true },
    toObject : { virtuals: true }
    }
)


// order.virtual("Product", {
//     ref : ""

// })




  


const Order = mongoose.model("order", order)


export default Order