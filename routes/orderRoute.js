import { Router } from "express";
import { getOrders , addOrder } from "../controllers/orderController.js";


const orderRouter = Router()



orderRouter.route("/")
.get( getOrders )
// .post( addOrder )


orderRouter.route("/:id")
.get( getOrders )
.post( addOrder )



export default orderRouter