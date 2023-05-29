import { Router } from "express"
import { createNewRestaurant, createEmployeeToRestaurant, getRestaurantById, listRestaurant} from "../controllers/restaurant.controller"
import { verifyAdministratorRole } from "../middlewares/verify.administrator"

const restaurantRouter = Router()

restaurantRouter
    .get('/:itemsPerPage', listRestaurant)
    .get('/:restaurantId', getRestaurantById)
    .post('/create', verifyAdministratorRole ,createNewRestaurant)
    .post('/createEmployeeRestaurant', createEmployeeToRestaurant)

export default restaurantRouter