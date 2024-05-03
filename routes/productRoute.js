import  { Router } from "express";
import { get , create, getAll} from "../controllers/productController.js";
import { protect } from "../middleware/protect.js";

const ProductRoute = Router()

ProductRoute
.route('/')
.get(protect ,  getAll)
.post(create)



ProductRoute
.route('/:id')
.get(get)
.put()
.delete()


export default ProductRoute;