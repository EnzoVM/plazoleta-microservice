import { Router } from "express"
import { addNewRestaurant } from "../controllers/restaurant.controller"

const restaurantRouter = Router()

restaurantRouter
    .post('/create', addNewRestaurant)

export default restaurantRouter