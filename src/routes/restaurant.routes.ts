import { Router } from "express"
import { addNewRestaurant, addRestaurantEmployee} from "../controllers/restaurant.controller"
import { verifyAdministratorRole } from "../middlewares/verify.administrator"

const restaurantRouter = Router()

restaurantRouter
    .post('/create', verifyAdministratorRole ,addNewRestaurant)
    .post('/createRestaurantEmployee', addRestaurantEmployee)

export default restaurantRouter