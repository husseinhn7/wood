import mongoose, { Schema } from "mongoose";
import validator from "validator";


const productSchema = mongoose.Schema({
        name        : String,
        smallDesc   : String,
        color       : [Schema.Types.Mixed],
        sizes       : [String],
        style       : [String],
        price       : Number , 
        discount    : Number ,
        rate        : Number ,
        fullDesc    : String,
        specification: String,
        material    : String,
        materialColor : String,
        language    : String,
        thickness   : String,
        other       : String,
        videoUrl    :String,
      },
       { 
        toJSON : { virtuals: true },
        toObject : { virtuals: true }
        }

)
productSchema.virtual("reviews" , 
{
ref : "Review",
foreignField: "prod",
localField : "_id"
}
)



const Product = mongoose.model("Product" , productSchema )


export default Product;