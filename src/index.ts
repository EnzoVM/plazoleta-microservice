import express, {Request, Response} from 'express'
import morgan from 'morgan'
import restaurantRoutes from './routes/restaurant.routes'

const app = express()

app.set('PORT', process.env.PORT || 3001)
app.use(express.json())
app.use(morgan('dev'))


app.get('/', (request: Request, response: Response) =>{
    response.status(201).json({
        message: 'Plazoleta Microservice'
    }).end()
})

app.use('/api/v1/restaurant', restaurantRoutes)

app.listen(app.get('PORT'), ()=>{
      console.log(`Server running on port ${app.get('PORT')}`);
})
