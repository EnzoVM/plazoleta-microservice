import { Router } from "express"
import { addNewDish } from "../controllers/dish.controller"

const dishRoutes = Router()

dishRoutes.post('/createDish', addNewDish)


export default dishRoutes