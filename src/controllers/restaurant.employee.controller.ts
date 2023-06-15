import {Request, Response} from 'express'
import InsertEmployeeToRestaurant from '../core/restaurantemployee/application/insert.employee.to.restaurant'
import GetRestaurantEmployeeByEmployeeId from '../core/restaurantemployee/application/get.restaurant.employee.by.employee.id'

import RestaurantEmployeePrismaRepository from '../core/restaurantemployee/infraestructure/prisma/restaurant.employee.prisma.repository'
import RestaurantEmployeeUuidRepository from '../core/restaurantemployee/infraestructure/uuid/restaurant.employee.uuid.repository'

const insertEmployeeToRestaurant = new InsertEmployeeToRestaurant(new RestaurantEmployeePrismaRepository, new RestaurantEmployeeUuidRepository)
const getRestaurantEmployeeByEmployeeId = new GetRestaurantEmployeeByEmployeeId(new RestaurantEmployeePrismaRepository)

export const createEmployeeToRestaurant = async (req: Request, res: Response) => {
    const {restaurantId, chefId } = req.body

    try {
        const newRestaurantEmployeeAdded = await insertEmployeeToRestaurant.insertEmployeeToRestaurant(restaurantId, chefId)

        res.status(201).json({
            status: 'OK',
            message: 'Data is registered',
            data: newRestaurantEmployeeAdded
        })

    } catch (error:any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}

export const getRestaurantEmployee = async (req: Request, res: Response) => {
    const { chefId } = req.params

    try {
        const restaurantEmployeeFound = await getRestaurantEmployeeByEmployeeId.getRestaurantEmployee(chefId)

        res.status(200).json({
            status: 'OK',
            message: 'The restaurant employee was found',
            data: restaurantEmployeeFound
        })
    } catch (error: any) {
        
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }

}