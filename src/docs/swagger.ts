import swaggerJSDoc, {OAS3Definition, OAS3Options} from "swagger-jsdoc";
import {createRestaurant, responseCreateRestaurant} from './restaurant.docs'

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: {
        title: 'Plazoleta Microservice - Talent Pool',
        version: '1.0.0',
        description: 'An service that provide CRUD from restaurant and dishes'
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Local server'
        }
    ],
    tags: [
        {
            name: 'Restaurant'
        }
    ],
    paths: {
        '/api/v1/restaurant/createRestaurant':{
            post: createRestaurant
        }
    },
    components: {
        schemas:{
            responseCreateRestaurant
        }   
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions)