import { Router } from "express"
import { addNewRestaurant } from "../controllers/restaurant.controller"

const restaurantRoutes = Router()

restaurantRoutes.post('/createRestaurant', addNewRestaurant)

export default restaurantRoutes