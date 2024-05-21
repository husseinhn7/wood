import { Router } from "express";
import { CreateReview , getAll } from "../controllers/reviewController.js";




const reviewRoute = Router()


reviewRoute
.route("/")
.get(getAll)
.post(CreateReview)


export default reviewRoute