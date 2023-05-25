

//EndPoints
const createRestaurant = {
    tags: ['Restaurant'],
    summary: 'Insert a new restaurant by admin',
    description: 'This endpoint is for insert a new restaurant by administrator',
    security: [
        {
            tokenForCreateRestaurant: []
        }
    ],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        restaurantName: {
                            type: 'string',
                            description: 'Name of the new restaurant',
                            require: true,
                            example: 'RestauranteNuevo2000'
                        },
                        restaurantNIT: {
                            type: 'number',
                            description: 'NIT of the new restaurant',
                            require: true,
                            example: 954673546
                        },
                        restaurantAddress: {
                            type: 'string',
                            description: 'Address of the new restaurant',
                            require: true,
                            example: 'Av. Nuevo Direccion'
                        },
                        restaurantPhoneNumber: {
                            type: 'string',
                            description: 'PhoneNumber of the new restaurant',
                            require: true,
                            example: '+734526754234'
                        },
                        restaurantUrlLogo: {
                            type: "string",
                            description: 'URL Logo of the new restaurant',
                            require: true,
                            example: 'https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1'
                        },
                        ownerId: {
                            type: 'string',
                            description: 'Owner ID of the new restaurant',
                            require: true,
                            example: '7293688879321855281'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            description: 'Results for creating a new restaurant',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseCreateRestaurant'
                    }
                }
            }
        }
    }
}


//Schemas
const tokenForCreateRestaurant = {
    type: 'http',
    scheme: 'bearer',
    description: 'Use this admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MTYyMjM3NjYzNTU2NDk0NjQ5IiwidXNlclJvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjg0ODAwNTgwfQ.2XyADUiWdkhUySKHMl9VwBKoVNe-usyQqKCxBy51ZX4',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MTYyMjM3NjYzNTU2NDk0NjQ5IiwidXNlclJvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjg0ODAwNTgwfQ.2XyADUiWdkhUySKHMl9VwBKoVNe-usyQqKCxBy51ZX4'
}

const responseCreateRestaurant = {
    type: 'object',
    properties: {
        status: {
            type: 'string',
            description: 'State code of the response',
            require: true,
            example: 'OK'
        },
        message: {
            type: 'string',
            description: 'Message of the response',
            require: true,
            example: 'The new restaurant has been created successfully'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                restaurantId: '2a1c5403-7ab2-4fae-b6fa-8ed58720524d',
                restaurantName: "Restaurante 123",
                restaurantNIT: 987457634,
                restaurantAddress: "Av. Prueba 356",
                restaurantPhoneNumber: "+734563456234",
                restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
                ownerId: "3544443293362567219"
            }
        }
    }
}

export {tokenForCreateRestaurant, createRestaurant, responseCreateRestaurant}



