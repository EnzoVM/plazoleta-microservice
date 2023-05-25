import { Router } from "express"
import { createNewDish, updateDish } from "../controllers/dish.controller"
import { verifyOwnerRole } from "../middlewares/verify.owner"

const dishRouter = Router()

dishRouter
    .post('/create', verifyOwnerRole ,createNewDish)
    .put('/update/:dishId', verifyOwnerRole, updateDish)

export default dishRouter