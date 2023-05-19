import express, {Request, Response} from 'express'
import morgan from 'morgan'
import restaurantRoutes from './routes/restaurant.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerSetup from './docs/swagger'
import dishRoutes from './routes/dish.routes'

const app = express()

app.set('PORT', process.env.PORT || 3001)
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (request: Request, response: Response) =>{
    response.status(201).json({
        message: 'Plazoleta Microservice v1'
    }).end()
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use('/api/v1/restaurant', restaurantRoutes)
app.use('/api/v1/dish', dishRoutes)

const server = app.listen(app.get('PORT'), ()=>{
      console.log(`Server running on port ${app.get('PORT')}`);
})

export default {
    app,
    server
}