import Review from "../models/reviewModel.js"




export const CreateReview = async (req , res) =>{
    const data = await req.body 
    const newprod = await Review.insertMany(data)
    res.status(201).json({
        status : 'success',
        data : {
            tour : newprod
        }
    })
}


export const  getAll = async (req, res) =>{
    const ReviewData = await Review.find().populate({
        path : "user",
        select : "-name  "
    }).populate({
        path : "prod",
    })
    res.json({
        data : ReviewData
    })   
}