import index from '../src/index'
import request from 'supertest'
import { dataDishMissing, dishPriceValidator } from './helpers/dish.helpers'

const { app, server} = index
const api = request(app)

describe('POST /createDish', () => {

    test('Should create a new dish', async () => {
        const response = await api.post('/api/v1/dish/createDish').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
            dishUrlImage: "urldeprueba"
        }).expect('Content-Type', /application\/json/)
          .expect(201)

        expect(response.body.data.dishActive).toBe(true)
    })

    test('When one field or all fields are missing', async () => {
        for(const dataDish of dataDishMissing){
            const response = await api.post('/api/v1/dish/createDish').send(dataDish)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('Data is missing')
        }
    })

    test('When the price is not positive, integer and greater than 0', async () => {
        for(const dataDish of dishPriceValidator){
            const response = await api.post('/api/v1/dish/createDish').send(dataDish)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('The dish data entered is not correct')
        }
    })

    test('When restaurant id is not correspond to an restaurant', async () => {
        const response = await api.post('/api/v1/dish/createDish').send({
            dishName: "Plato nuevo",
            categoryId: "2000001",
            dishDescription: "Este es un plato de prueba",
            dishPrice: 20,
            restaurantId: "1a2a730e-ee3c-4d4f-9f19-4554444", //The restaurant id is wrong
            dishUrlImage: "urldeprueba"
        }).expect('Content-Type', /application\/json/)
          .expect(400)

        expect(response.body.message).toStrictEqual('The id entered does not belong to a restaurant')
    })
})

afterAll(async () =>{
    await server.close()
})