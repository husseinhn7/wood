import mongoose from "mongoose"
import Product from "../models/productModel.js"
  


export const get = async (req , res)=>{
    const id = await req.params.id
    console.log(req.params.id)
    const product = await Product.find({_id : id}).populate("reviews")
    res.status(200).json({msg : product})
}

const remove = async (req , res)=>{
    console.log(req.params.id)
    res.status(200).json({msg : req.param.id})
}

const update = async (req , res)=>{
    console.log(req.params.id)
    res.status(200).json({msg : req.param.id})
}

export const create = async (req , res)=>{
    const data = await req.body
    const newProduct = await Product.insertMany(data)
    res.status(201).json({
        status : 'success',
        data : {
            tour : newProduct
        }
    })
}



export const getAll = async (req , res)=>{   
    const id = await req.params.id
    console.log(req.params.id)
    const product = await Product.find()
    res.status(200).json({msg : product})
}

