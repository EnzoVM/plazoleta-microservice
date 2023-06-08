//Params
const itemsPerPage = {
    name: 'itemsPerPage',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'This is items per page',
    example: '5'
}

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
                        $ref: '#/components/schemas/responseForCreateRestaurant'
                    }
                }
            }
        }
    }
}

const listRestaurantsByPage = {
    tags: ['Restaurant'],
    summary: 'List restaurants by page',
    description: 'This endpoint is for list restaurants according to the items by pages',
    parameters: [
        itemsPerPage
    ],
    responses: {
        '200': {
            description: 'Results of list restaurants per page',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseForListRestaurantsPerPage'
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

const responseForCreateRestaurant = {
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

const responseForListRestaurantsPerPage = {
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
            example: 'List of all restaurants per page'
        },
        data: {
            type: 'array',
            description: 'Data of the response',
            require: true,
            example: [
                [
                    {
                        restaurantName: "abc",
                        restaurantUrlLogo: "https://res.cloudinary.com/enzogvm/image/upload/v1685123863/zeb3ktp24bkjs9htb6fc.jpg"
                    },
                    {
                        restaurantName: "r12345",
                        restaurantUrlLogo: "urlejemplo"
                    },
                    {
                        restaurantName: "r12345",
                        restaurantUrlLogo: "https://res.cloudinary.com/enzogvm/image/upload/v1684445265/drjmzhlgqazxyyinrrfz.jpg"
                    }
                ],
                [
                    {
                        restaurantName: "r12345",
                        restaurantUrlLogo: "https://res.cloudinary.com/enzogvm/image/upload/v1684447279/e0tzijpf2bd5lcgyhck1.jpg"
                    },
                    {
                        restaurantName: "r12345",
                        restaurantUrlLogo: "https://res.cloudinary.com/enzogvm/image/upload/v1684445209/ndf5yx11ngcphkkxnine.jpg"
                    },
                    {
                        restaurantName: "r12345",
                        restaurantUrlLogo: "urlejemplo"
                    }
                ],
                [
                    {
                        restaurantName: "RestauranNuevo2000",
                        restaurantUrlLogo: "https://res.cloudinary.com/enzogvm/image/upload/v1684813922/s7dge1liyckdw8ncos5z.jpg"
                    },
                    {
                        restaurantName: "RestauranNuevo2000",
                        restaurantUrlLogo: "https://res.cloudinary.com/enzogvm/image/upload/v1684813953/dnyfcrhpn0nppjjmoami.jpg"
                    },
                    {
                        restaurantName: "RestauranNuevoPrueba2000",
                        restaurantUrlLogo: "https://res.cloudinary.com/enzogvm/image/upload/v1685038699/v5wranqrdun3whpifm8f.jpg"
                    }
                ]
            ] 
        }
    }
}

export {tokenForCreateRestaurant, createRestaurant, responseForCreateRestaurant, listRestaurantsByPage, responseForListRestaurantsPerPage}



