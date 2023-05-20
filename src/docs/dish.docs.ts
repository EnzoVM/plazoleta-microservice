//Params
const dishId = {
    name: 'dishId',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'This is id of a dish',
    example: '1700b00e-5bf4-4d00-b34f-bf8fc9ef10d4'
}


//EndPoints
const createDish = {
    tags: ['Dish'],
    summary: 'Insert a new dish by an owner',
    description: 'This endpoint is for insert a new dish by an owner',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        dishName: {
                            type: 'string',
                            description: 'Name of the new dish',
                            require: true,
                            example: 'Plato Prueba'
                        },
                        categoryId: {
                            type: 'string',
                            description: 'CategoryID of the new dish',
                            require: true,
                            example: '2000001'
                        },
                        dishDescription: {
                            type: 'string',
                            description: 'Description of the new dish',
                            require: true,
                            example: 'Este es un plato de prueba'
                        },
                        dishPrice: {
                            type: 'number',
                            description: 'Price of the new dish',
                            require: true,
                            example: 30
                        },
                        restaurantId: {
                            type: "string",
                            description: 'RestaurantID of the new dish',
                            require: true,
                            example: '08f71c12-407f-44fa-a287-8ae32fef9e0b'
                        },
                        dishUrlImage: {
                            type: 'string',
                            description: 'URL image of the new dish',
                            require: true,
                            example: 'https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            description: 'Results for creating a new dish',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseCreateDish'
                    }
                }
            }
        }
    }
}

const updateDish = {
    tags: ['Dish'],
    summary: 'Update a dish by an owner',
    description: 'This endpoint is for update a dish by an owner',
    parameters: [
        dishId
    ],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        dishDescription: {
                            type: 'string',
                            description: 'Description updated of the dish',
                            require: true,
                            example: 'Esta es una descripcion actualizada'
                        },
                        dishPrice: {
                            type: 'number',
                            description: 'Price updated of the dish',
                            require: true,
                            example: 120
                        }
                    }
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Results for updating a dish',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseUpdateDish'
                    }
                }
            }
        }
    }
}


//Schemas of responses
const responseCreateDish = {
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
            example: 'The new dish has been created successfully'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                dishId: "9cde6648-d7dc-426b-8a2d-633f951d5645",
                dishName: "Plato Nuevo",
                categoryId: "2000001",
                dishDescription: "Este es un plato nuevo",
                dishPrice: 50,
                restaurantId: "67067d24-15bd-4a21-a40d-95a68a3a7d92",
                dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1684479791/p1tvld0cl8jezogpjxid.jpg",
                dishActive: true
            }
        }
    }
}

const responseUpdateDish = {
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
            example: 'The dish has been updated successfully'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                dishId: "9cde6648-d7dc-426b-8a2d-633f951d5645",
                dishName: "Plato Nuevo",
                categoryId: "2000001",
                dishDescription: "Esta es una descripcion actualizada",
                dishPrice: 110,
                restaurantId: "67067d24-15bd-4a21-a40d-95a68a3a7d92",
                dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1684479791/p1tvld0cl8jezogpjxid.jpg",
                dishActive: true
            }
        }
    }
}

export {createDish, responseCreateDish, updateDish, responseUpdateDish, dishId}



