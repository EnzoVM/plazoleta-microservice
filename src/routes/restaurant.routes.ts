import { Router } from "express"
import { createNewRestaurant, createEmployeeToRestaurant, getRestaurantById} from "../controllers/restaurant.controller"
import { verifyAdministratorRole } from "../middlewares/verify.administrator"

const restaurantRouter = Router()

restaurantRouter
    .get('/:restaurantId', getRestaurantById)
    .post('/create', verifyAdministratorRole ,createNewRestaurant)
    .post('/createEmployeeRestaurant', createEmployeeToRestaurant)

export default restaurantRouter