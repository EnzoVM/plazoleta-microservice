import { Router } from "express"
import { createNewDish, listDishesByRestaurant, updateDish, updateStateDish } from "../controllers/dish.controller"
import { verifyOwnerRole } from "../middlewares/verify.owner"

const dishRouter = Router()

dishRouter
    .get('/:itemsPerPage/:restaurantId', listDishesByRestaurant)
    .post('/create', verifyOwnerRole ,createNewDish)
    .put('/update/:dishId', verifyOwnerRole, updateDish)
    .put('/update/state/:dishId', verifyOwnerRole, updateStateDish)

export default dishRouter