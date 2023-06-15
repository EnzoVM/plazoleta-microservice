import { Router } from "express"
import { createNewDish, getDishByDishId, listDishesByRestaurant, updateDish, updateStateDish } from "../controllers/dish.controller"
import { verifyOwnerRole } from "../middlewares/verify.owner"
import { verifyUserRole } from "../middlewares/verify.user.role"

const dishRouter = Router()

dishRouter
    .get('/:dishId', getDishByDishId)
    .get('/:page/:limit/:restaurantId', verifyUserRole('Client'), listDishesByRestaurant)
    .post('/create', verifyOwnerRole ,createNewDish)
    .put('/update/:dishId', verifyOwnerRole, updateDish)
    .put('/update/state/:dishId', verifyOwnerRole, updateStateDish)

export default dishRouter