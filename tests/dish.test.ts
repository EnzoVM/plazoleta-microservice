import index from '../src/index'
import request from 'supertest'
import {
dishDataForCreate, 
dishDataValidateForCreate,
dishDataForUpdate,
dishDataValidateForUpdate} from './helpers/dish.helpers'

const { app, server} = index
const api = request(app)

describe('POST /createDish', () => {

    test('Should create a new dish', async () => {
        const response = await api.post('/api/v1/dishes/create').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
            dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
        }).expect('Content-Type', /application\/json/)
          .expect(201)

        expect(response.body.data.dishActive).toBe(true)
    })

    test('When one field or all fields are missing', async () => {
        for(const dishData of dishDataForCreate){
            const response = await api.post('/api/v1/dishes/create').send(dishData)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('Data is missing')
        }
    })

    test('When the price is not positive, integer and greater than 0', async () => {
        for(const dishData of dishDataValidateForCreate){
            const response = await api.post('/api/v1/dishes/create').send(dishData)
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
        }).expect('Content-Type', /application\/json/)
          .expect(400)

        expect(response.body.message).toStrictEqual('The id entered does not belong to a restaurant')
    })
})


describe('PUT /updateDish', () => {

    const dishId = '1700b00e-5bf4-4d00-b34f-bf8fc9ef10d4'

    test('Should update a dish', async () => {
        const response = await api.put(`/api/v1/dishes/update/${dishId}`).send({
            dishDescription: 'Esta descripcion fue actualizada',
            dishPrice: 80
        }).expect('Content-Type', /application\/json/)
          .expect(200)

        expect(response.body.data.dishPrice).toBe(80)
    })

    test('When the description or price are missing', async () => {
        for(const dishData of dishDataForUpdate){
            const response = await api.put(`/api/v1/dishes/update/${dishId}`).send(dishData)
                .expect('Content-Type', /application\/json/)
                .expect(400)
            
            expect(response.body.message).toStrictEqual('Data is missing')
        }
    })

    test('When description or price validate are wrong', async () => {
        for(const dishData of dishDataValidateForUpdate){
            const response = await api.put(`/api/v1/dishes/update/${dishId}`).send(dishData)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('The description or price entered are incorrect')
        }
    })
})

afterAll(async () =>{
    await server.close()
})