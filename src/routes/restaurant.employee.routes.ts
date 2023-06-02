import { Router } from "express"
import { createEmployeeToRestaurant, getRestaurantEmployee } from "../controllers/restaurant.employee.controller"

const restaurantEmployeeRouter = Router()

restaurantEmployeeRouter
    .get('/:chefId', getRestaurantEmployee)
    .post('/create', createEmployeeToRestaurant)

export default restaurantEmployeeRouter