import mongoose from "mongoose";




const review = mongoose.Schema({
    text : {
        type : String,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    prod :{
        type : mongoose.Schema.ObjectId,
        ref : "Product" 
    }

})






const Review = mongoose.model("Review" , review)

export default Review