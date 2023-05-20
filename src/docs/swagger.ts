import swaggerJSDoc, {OAS3Definition, OAS3Options} from "swagger-jsdoc";
import {createRestaurant, responseCreateRestaurant} from './restaurant.docs'
import {createDish, responseCreateDish, updateDish, responseUpdateDish, dishId} from "./dish.docs";

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
        },
        {
            name: 'Dish'
        }
    ],
    paths: {
        '/api/v1/restaurants/create':{
            post: createRestaurant
        },
        '/api/v1/dishes/create': {
            post: createDish
        },
        '/api/v1/dishes/update/{dishId}': {
            put: updateDish
        }
    },
    components: {
        schemas:{
            responseCreateRestaurant,
            responseCreateDish,
            responseUpdateDish
        }   
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions)