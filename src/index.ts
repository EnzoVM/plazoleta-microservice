import dotenv from 'dotenv'
dotenv.config()
import express, {Request, Response} from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSetup from './docs/swagger'

import restaurantRouter from './routes/restaurant.routes'
import dishRouter from './routes/dish.routes'
import orderRouter from './routes/order.routes'
import restaurantEmployeeRouter from './routes/restaurant.employee.routes'
import healthRoutes from './routes/health.routes'
import prisma from './connections/prisma.connection'
import cors from 'cors'

const app = express()

app.set('PORT', process.env.PORT || 3001)
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (_request: Request, response: Response) =>{
    response.status(201).json({
        message: 'Plazoleta Microservice v1'
    }).end()
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use('/api/v1/restaurants', restaurantRouter)
app.use('/api/v1/dishes', dishRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/restaurantemployee', restaurantEmployeeRouter)
app.use('/api/v1', healthRoutes)

prisma.$connect()
.then(() => console.log('MySQL was connected successfully'))
.catch((error: any) => console.log('Error for prisma conection', error))

const server = app.listen(app.get('PORT'), ()=>{
      console.log(`Server running on port ${app.get('PORT')}`);
})

export default {
    app,
    server
}