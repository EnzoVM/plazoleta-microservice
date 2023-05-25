import index from '../src/index'
import request from 'supertest'
import { dataRestaurantMissing, dataRestaurantValidate } from './helpers/restautant.helpers'

const {app, server} = index
const api = request(app)
const adminToken = process.env.ADMIN_TOKEN
const ownerToken = process.env.OWNER_TOKEN
const tokenInvalid = 'ecnecnenne3jrn4rn4jrn4r'

describe('POST /createRestaurant', () => {

    test('Should create a new restaurant', async () => {
        const response = await api.post('/api/v1/restaurants/create').send({
            restaurantName: "RestaurantPrueba20",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+324563456812",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7365416628461253217"
        }).set('Authorization', `Bearer ${adminToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(201)

        expect(response.body.data.restaurantName).toStrictEqual("RestaurantPrueba20")
    })

    test('When there is not token', async () => {
        const response = await api.post('/api/v1/restaurants/create').send({
            restaurantName: "RestaurantPrueba20",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+324563456812",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7365416628461253217"
        }).expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Unauthorized access. A valid token is required")
    })

    test('When a token from another role is entered', async () => {
        const response = await api.post('/api/v1/restaurants/create').send({
            restaurantName: "RestaurantPrueba20",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+324563456812",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7365416628461253217"
        }).set('Authorization', `Bearer ${ownerToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(403)

        expect(response.body.message).toStrictEqual("Access denied. Administrator role is required")
    })

    test('When a token entered is not valid', async () => {
        const response = await api.post('/api/v1/restaurants/create').send({
            restaurantName: "RestaurantPrueba20",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+324563456812",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7365416628461253217"
        }).set('Authorization', `Bearer ${tokenInvalid}`)
          .expect('Content-Type', /application\/json/)
          .expect(401)

        expect(response.body.message).toStrictEqual("Invalid token")
    })
  
    test('When one field or all fields are missing', async () => {
        for(const dataRestaurant of dataRestaurantMissing) {
            const response = await api.post('/api/v1/restaurants/create').send(dataRestaurant)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('Data is missing')
        }
    })

    test('When owner id is not correspond to an owner', async () => {
        const response = await api.post('/api/v1/restaurants/create').send({
            restaurantName: "RestaurantePrueba",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+324563456812",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7076059024486249011"
        }).set('Authorization', `Bearer ${adminToken}`)
          .expect('Content-Type', /application\/json/)
          .expect(400)

        expect(response.body.message).toStrictEqual('The entered role does not belong to an owner')
    })

    test('When NIT/PhoneNumber/nameRestaurant validate is wrong', async () => {
        for(const dataRestaurant of dataRestaurantValidate) {
            const response = await api.post('/api/v1/restaurants/create').send(dataRestaurant)
                .set('Authorization', `Bearer ${adminToken}`)    
                .expect('Content-Type', /application\/json/)
                .expect(400)

            expect(response.body.message).toStrictEqual('The restaurant data entered is not correct')
        }
    })
})

afterAll(async () =>{
    await server.close()
})