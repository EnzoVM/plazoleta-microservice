import { Router } from "express"
import { createNewRestaurant, getRestaurantById, listRestaurant} from "../controllers/restaurant.controller"
import { verifyUserRole } from "../middlewares/verify.user.role"

const restaurantRouter = Router()

restaurantRouter
    .get('/:restaurantId', getRestaurantById)
    .get('/list/:page/:limit', listRestaurant)
    .post('/create', verifyUserRole('Administrator'),createNewRestaurant)

export default restaurantRouter