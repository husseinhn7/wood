import  { Router } from "express";
import { get , create, getAll} from "../controllers/productController.js";
import { protect ,restrict} from "../middleware/protect.js";

const ProductRoute = Router()

ProductRoute
.route('/')
.get(protect , restrict("admin") ,   getAll)
.post(create)



ProductRoute
.route('/:id')
.get(get)
.put()
.delete()


export default ProductRoute;