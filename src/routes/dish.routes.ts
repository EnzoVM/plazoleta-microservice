import { Router } from "express"
import { createDish, updateDish } from "../controllers/dish.controller"

const dishRouter = Router()

dishRouter
    .post('/create', createDish)
    .put('/update/:dishId', updateDish)

export default dishRouter