import express, {Request, Response} from 'express'
import morgan from 'morgan'

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(morgan('dev'))


app.get('/', (request: Request, response: Response) =>{
    response.status(201).json({
        message: 'Plazoleta Microservice'
    }).end()
})

app.listen(app.get('PORT'), ()=>{
      console.log(`Server running on port ${app.get('PORT')}`);
})
