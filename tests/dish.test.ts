import index from '../src/index'
import request from 'supertest'
import {
dishDataForCreate, 
dishDataValidateForCreate,
dishDataForUpdate,
dishDataValidateForUpdate} from './helpers/dish.helpers'

const { app, server} = index
const api = request(app)
const adminToken = process.env.ADMIN_TOKEN
const ownerToken = process.env.OWNER_TOKEN
const ownerWrongToken = process.env.OWNER_WRONG_TOKEN
const tokenInvalid = 'ecnecnenne3jrn4rn4jrn4r'

describe('POST /createDish', () => {

    test('Should create a new dish', async () => {
        const response = await api.post('/api/v1/dishes/create').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
        }).set('Authorization', `Bearer ${ownerToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(201)

        expect(response.body.data.dishActive).toBe(true)
    })

    test('When there is not token', async () => {
        const response = await api.post('/api/v1/dishes/create').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
        }).expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Unauthorized access. A valid token is required")
    })

    test('When a token from another role is entered', async () => {
        const response = await api.post('/api/v1/dishes/create').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
        }).set('Authorization', `Bearer ${adminToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(403)

        expect(response.body.message).toStrictEqual("Access denied. Owner role is required")
    })

    test('When a token entered is not valid', async () => {
        const response = await api.post('/api/v1/dishes/create').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
        }).set('Authorization', `Bearer ${tokenInvalid}`)
          .expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Invalid token")
    })
    
    test('When the owner does not belong to the restaurant of the dish', async () => {
        const response = await api.post('/api/v1/dishes/create').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
            dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
        }).set('Authorization', `Bearer ${ownerWrongToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(403)

        expect(response.body.message).toStrictEqual("Access denied. This restaurant is not assigned to this owner")
    })

    test('When one field or all fields are missing', async () => {
        for(const dishData of dishDataForCreate){
            const response = await api.post('/api/v1/dishes/create').send(dishData)
                .set('Authorization', `Bearer ${ownerToken}`)    
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('Data is missing')
        }
    })

    test('When the price is not positive, integer and greater than 0', async () => {
        for(const dishData of dishDataValidateForCreate){
            const response = await api.post('/api/v1/dishes/create').send(dishData)
                .set('Authorization', `Bearer ${ownerToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('The dish data entered is not correct')
        }
    })

    test('When restaurant id is not correspond to an restaurant', async () => {
        const response = await api.post('/api/v1/dishes/create').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "1a2a730e-ee3c-4d4f-4554-4554444", //The restaurant id is wrong
            dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
        }).set('Authorization', `Bearer ${ownerToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(404)

        expect(response.body.message).toStrictEqual('The restaurant id entered does not exist')
    })
})


describe('PUT /updateDish', () => {

    const dishId = '722a850c-6591-4a6f-b292-2bd07249af60'

    test('Should update a dish', async () => {
        const response = await api.put(`/api/v1/dishes/update/${dishId}`).send({
            dishDescription: 'Esta descripcion fue actualizada',
            dishPrice: 80
        }).set('Authorization', `Bearer ${ownerToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(200)

        expect(response.body.data.dishPrice).toBe(80)
    })

    test('When there is not token', async () => {
        const response = await api.put(`/api/v1/dishes/update/${dishId}`).send({
            dishDescription: 'Esta descripcion fue actualizada',
            dishPrice: 80
        }).expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Unauthorized access. A valid token is required")
    })

    test('When a token from another role is entered', async () => {
        const response = await api.put(`/api/v1/dishes/update/${dishId}`).send({
            dishDescription: 'Esta descripcion fue actualizada',
            dishPrice: 80
        }).set('Authorization', `Bearer ${adminToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(403)

        expect(response.body.message).toStrictEqual("Access denied. Owner role is required")
    })

    test('When a token entered is not valid', async () => {
        const response = await api.put(`/api/v1/dishes/update/${dishId}`).send({
            dishDescription: 'Esta descripcion fue actualizada',
            dishPrice: 80
        }).set('Authorization', `Bearer ${tokenInvalid}`)
          .expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Invalid token")
    })

    test('When the owner does not belong to the restaurant of the dish', async () => {
        const response = await api.put(`/api/v1/dishes/update/${dishId}`).send({
            dishDescription: 'Esta descripcion fue actualizada',
            dishPrice: 80
        }).set('Authorization', `Bearer ${ownerWrongToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(403)

        expect(response.body.message).toStrictEqual("Access denied. This restaurant is not assigned to this owner")
    })

    test('When the description or price are missing', async () => {
        for(const dishData of dishDataForUpdate){
            const response = await api.put(`/api/v1/dishes/update/${dishId}`).send(dishData)
                .set('Authorization', `Bearer ${ownerToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)
            
            expect(response.body.message).toStrictEqual('Data is missing')
        }
    })

    test('When description or price validate are wrong', async () => {
        for(const dishData of dishDataValidateForUpdate){
            const response = await api.put(`/api/v1/dishes/update/${dishId}`).send(dishData)
                .set('Authorization', `Bearer ${ownerToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('The description or price entered are incorrect')
        }
    })
})


describe('PUT /updateStateDish', () => {

    const dishId = '722a850c-6591-4a6f-b292-2bd07249af60'

    test('Should update state of a dish', async () => {
        const response = await api.put(`/api/v1/dishes/update/state/${dishId}`).send({
            dishActive: false
        }).set('Authorization', `Bearer ${ownerToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(200)

        expect(response.body.data.dishActive).toBe(false)
    })

    test('When there is not token', async () => {
        const response = await api.put(`/api/v1/dishes/update/state/${dishId}`).send({
            dishActive: false
        }).expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Unauthorized access. A valid token is required")
    })

    test('When a token from another role is entered', async () => {
        const response = await api.put(`/api/v1/dishes/update/state/${dishId}`).send({
            dishActive: false
        }).set('Authorization', `Bearer ${adminToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(403)

        expect(response.body.message).toStrictEqual("Access denied. Owner role is required")
    })

    test('When a token entered is not valid', async () => {
        const response = await api.put(`/api/v1/dishes/update/state/${dishId}`).send({
            dishActive: false
        }).set('Authorization', `Bearer ${tokenInvalid}`)
          .expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Invalid token")
    })

    test('When the owner does not belong to the restaurant of the dish', async () => {
        const response = await api.put(`/api/v1/dishes/update/state/${dishId}`).send({
            dishActive: false
        }).set('Authorization', `Bearer ${ownerWrongToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(403)

        expect(response.body.message).toStrictEqual("Access denied. This restaurant is not assigned to this owner")
    })

    test('When the dishActive is missing', async () => {
        const response = await api.put(`/api/v1/dishes/update/state/${dishId}`).send({})
            .set('Authorization', `Bearer ${ownerToken}`)
            .expect('Content-Type', /application\/json/)
            .expect(400)
        
        expect(response.body.message).toStrictEqual('Data is missing')
    })
})

afterAll(async () =>{
    await server.close()
})