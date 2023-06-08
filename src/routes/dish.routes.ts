import { Router } from "express"
import { createNewDish, getDishByDishId, listDishesByRestaurant, updateDish, updateStateDish } from "../controllers/dish.controller"
import { verifyOwnerRole } from "../middlewares/verify.owner"

const dishRouter = Router()

dishRouter
    .get('/:dishId', getDishByDishId)
    .get('/:page/:limit/:restaurantId', listDishesByRestaurant)
    .post('/create', verifyOwnerRole ,createNewDish)
    .put('/update/:dishId', verifyOwnerRole, updateDish)
    .put('/update/state/:dishId', verifyOwnerRole, updateStateDish)

export default dishRouter