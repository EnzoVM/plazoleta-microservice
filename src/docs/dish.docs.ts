//Params
const dishId = {
    name: 'dishId',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'This is id of a dish',
    example: 'd639054b-148c-4e03-aa89-5c80dc2be73f'
}

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

const restaurantId = {
    name: 'restaurantId',
    in: 'path',
    required: true,
    schema: {
      type: 'string'
    },
    description: 'This is id of a restaurant',
    example: 'de891602-ef54-46bc-9356-9e4bf666defc'
}

//EndPoints
const createDish = {
    tags: ['Dish'],
    summary: 'Insert a new dish by an owner',
    description: 'This endpoint is for insert a new dish by an owner',
    security: [
        {
            tokenForCreateAndUpdateDish: []
        }
    ],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        dishName: {
                            type: 'string',
                            description: 'Name of a new dish',
                            require: true,
                            example: 'Plato Prueba'
                        },
                        categoryId: {
                            type: 'string',
                            description: 'CategoryID of a new dish',
                            require: true,
                            example: '2000001'
                        },
                        dishDescription: {
                            type: 'string',
                            description: 'Description of a new dish',
                            require: true,
                            example: 'Este es un plato de prueba'
                        },
                        dishPrice: {
                            type: 'number',
                            description: 'Price of a new dish',
                            require: true,
                            example: 30
                        },
                        restaurantId: {
                            type: "string",
                            description: 'RestaurantID of a new dish',
                            require: true,
                            example: 'de891602-ef54-46bc-9356-9e4bf666defc'
                        },
                        dishUrlImage: {
                            type: 'string',
                            description: 'URL image of a new dish',
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
            description: 'Results of create a new dish',
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
    security: [
        {
            tokenForCreateAndUpdateDish: []
        }
    ],
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
                            description: 'Description updated of a dish',
                            require: true,
                            example: 'Esta es una descripcion actualizada'
                        },
                        dishPrice: {
                            type: 'number',
                            description: 'Price updated of a dish',
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
            description: 'Results of update a dish',
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

const updateStateDish = {
    tags: ['Dish'],
    summary: 'Update state of a dish by an owner',
    description: 'This endpoint is for update state of a dish by an owner',
    security: [
        {
            tokenForCreateAndUpdateDish: []
        }
    ],
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
                        dishActive: {
                            type: 'boolean',
                            description: 'State updated of a dish',
                            require: true,
                            example: false
                        }
                    }
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Results of updating state a dish',
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

const listDishesByPage = {
    tags: ['Dish'],
    summary: 'List dishes by page',
    description: 'This endpoint is for list dishes by restaurant, category and page',
    parameters: [
        itemsPerPage,
        restaurantId
    ],
    responses: {
        '200': {
            description: 'Results of update a dish',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/responseForListDishesPerPage'
                    }
                }
            }
        }
    }
}

//Schemas
const tokenForCreateAndUpdateDish = {
    type: 'http',
    scheme: 'bearer',
    description: 'Use this owner token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MjkzNjg4ODc5MzIxODU1MjgxIiwidXNlclJvbGUiOiJPd25lciIsImlhdCI6MTY4NTAzOTY4OX0.BPB1Na1rTwqKDdvp8EGKl25psADCUrj9HPLQF6OKs5o',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MjkzNjg4ODc5MzIxODU1MjgxIiwidXNlclJvbGUiOiJPd25lciIsImlhdCI6MTY4NTAzOTY4OX0.BPB1Na1rTwqKDdvp8EGKl25psADCUrj9HPLQF6OKs5o'
}

const responseForCreateDish = {
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

const responseForUpdateDish = {
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

const responseForListDishesPerPage = {
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
            example: 'List of dishes per page, category and restaurant'
        },
        data: {
            type: 'object',
            description: 'Data of the response',
            require: true,
            example: {
                2000000: [
                    [
                        {
                            dishId: "53013158-5eb0-4b00-9fe3-d16434ca7382",
                            dishName: "Plato nuevo 9",
                            categoryId: "2000000",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141471/phdc5cjvmn4bi3fiqnwd.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "5da11ad9-9a2f-4cc4-9ae5-8b4654ed8866",
                            dishName: "Plato nuevo 100",
                            categoryId: "2000000",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141481/gwfe2glv8rqqoy7ociyy.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "863ced87-5544-4f58-abb3-4c86541c5994",
                            dishName: "Plato nuevo e9",
                            categoryId: "2000000",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141475/mfmjcm0utlyv6cbv8aul.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "b43671c3-dde4-4318-ba66-8e229dda51c0",
                            dishName: "Plato nuevo fe9",
                            categoryId: "2000000",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141477/rfhetiychcxhuymm8zuz.jpg",
                            dishActive: true
                        }
                    ]
                ],
                2000001: [
                    [
                        {
                            dishId: "16c354f9-0d8c-4131-8344-82f0a4ea7a1e",
                            dishName: "Plato Prueba",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 30,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685049672/utxf87goknqfzfsilo5z.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "44681f1e-cc48-4111-817b-9fbbc9ebdc76",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685049022/u4fv1xrlxrt0zjfti5ty.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "4b3239b1-6ee2-4e8a-aa56-ab4e8bcdd411",
                            dishName: "Plato nuevo rrr",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685055440/njddolyy3rbfsthhjhc7.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "55fd3268-5999-40a0-8e9a-54780df47179",
                            dishName: "Plato nuevo rrr",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685048987/tvzhy9m0quetymvyada3.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "56f2a6c8-6991-42f8-90ab-7c892d9665ef",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685049319/puhrawuog9qi7eqymkrv.jpg",
                            dishActive: true
                        }
                    ],
                    [
                        {
                            dishId: "6a1747fa-2ab9-43f7-99e0-98e9d810f71d",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685049623/feskm5hsgdqbfobuqc2p.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "722a850c-6591-4a6f-b292-2bd07249af60",
                            dishName: "Plato nuevo rrr",
                            categoryId: "2000001",
                            dishDescription: "Esta descripcion fue actualizada",
                            dishPrice: 80,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685040514/btcjfh6bm3exf27lzkb6.jpg",
                            dishActive: false
                        },
                        {
                            dishId: "803ea09b-b293-4db6-b5cb-428e07f49657",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685048841/hx6x5puotypqpb3g3tkq.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "80f6bf3c-0365-44cf-a51e-83f7f3beb263",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Esta es la descripción de un plato cambiada",
                            dishPrice: 200,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685039704/xxf6nzdwfj5feoly8lhg.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "a022cc72-0920-4b04-a872-46f9209398ac",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685058213/dpy4pgwz1aquwu98u4wg.jpg",
                            dishActive: true
                        }
                    ],
                    [
                        {
                            dishId: "b7c25e3a-42fc-489d-bcb5-3a74c6b8fe80",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685048345/c2y3nbrw8hp2pzhmt0e6.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "c7862bd0-9110-4f5b-a3d5-407e0c961ba7",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685058533/mfj63n2isfyj2pr10v7x.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "d1322791-e291-4fb2-aae9-1dc7cca313c3",
                            dishName: "Plato nuevo",
                            categoryId: "2000001",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685048147/seelvvviqpcl7h4w68n4.jpg",
                            dishActive: true
                        }
                    ]
                ],
                2000002: [
                    [
                        {
                            dishId: "08e7dfb7-e3c0-439f-81d6-a4eddc7313d5",
                            dishName: "Plato nuevo 2",
                            categoryId: "2000002",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141457/g8fwq9khikkdqqt1neys.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "13a85e67-0006-4780-97f3-21edad5a804f",
                            dishName: "Plato nuevo 1",
                            categoryId: "2000002",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141453/wfbipk3t2vfxgdsp1kel.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "14152d4e-c492-460d-8d50-31b95be85d1b",
                            dishName: "Plato nuevo 6",
                            categoryId: "2000002",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141460/x73ironohizxrmefuszi.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "703eab74-e4e8-446c-bdac-ccf3a32e7b84",
                            dishName: "Plato nuevo 7",
                            categoryId: "2000002",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141463/oeoyfqbwbi04fggoha0b.jpg",
                            dishActive: true
                        },
                        {
                            dishId: "a83a3be2-1752-4377-a073-e83e6525d431",
                            dishName: "Plato nuevo 9",
                            categoryId: "2000002",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141466/fisbfvlewalnvi292ahb.jpg",
                            dishActive: true
                        }
                    ],
                    [
                        {
                            dishId: "f7b958a5-2b73-41f7-aa7e-9276399e2bee",
                            dishName: "Plato nuevo rrr",
                            categoryId: "2000002",
                            dishDescription: "Este es un plato de prueba",
                            dishPrice: 20,
                            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
                            dishUrlImage: "https://res.cloudinary.com/enzogvm/image/upload/v1685141449/fjjdqfgnkulrvxsurkib.jpg",
                            dishActive: true
                        }
                    ]
                ]
            }
        }
    }
}

export {tokenForCreateAndUpdateDish, createDish, responseForCreateDish, updateDish, responseForUpdateDish, updateStateDish, listDishesByPage, responseForListDishesPerPage}



