import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import { catchAsync } from "./errorController.js"


export const getOrders =  async (req, res) =>{
    const orders = await Order.find().populate({ path : "product" })
    res
    .status(200)
    .json({
        statues : "success",
        orders : orders
    })

}


export const addOrder = async (req, res) =>{
    const orderData = await req.body
    const order = await Order.insertMany({...orderData, product : req.param.id})
    res.status(200)
    .json({
        statues : "success",
        orders : order
    })
}    


export const getOrder = async (req, res) =>{

    
}