import index from '../src/index'
import request from 'supertest'
import { dataRestaurantMissing, dataRestaurantValidate } from './helpers'

const {app, server} = index
const api = request(app)



describe('POST /createRestaurant', () => {

    test('Should create a new restaurant', async () => {
        const response = await api.post('/api/v1/restaurant/createRestaurant').send({
            restaurantName: "RestaurantePrueba13",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+324563456812",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "3702913700919063608"
        }).expect('Content-Type', /application\/json/)
          .expect(201)

        expect(response.body.data.restaurantName).toStrictEqual('RestaurantePrueba13')
    })

    test('When data is missing', async () => {
        for(const dataRestaurant of dataRestaurantMissing) {
            const response = await api.post('/api/v1/restaurant/createRestaurant').send(dataRestaurant)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            console.log(response.body);
            expect(response.body.message).toStrictEqual('Data is missing')
        }
    })

    test('When owner id is not correspond to an owner ', async () => {
        const response = await api.post('/api/v1/restaurant/createRestaurant').send({
            restaurantName: "RestaurantePrueba",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+324563456812",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7076059024486249011"
        }).expect('Content-Type', /application\/json/)
          .expect(400)

        expect(response.body.message).toStrictEqual('The entered role does not belong to an owner')
    })

    test('When NIT/PhoneNumber/nameRestaurant validate is wrong', async () => {
        for(const dataRestaurant of dataRestaurantValidate) {
            const response = await api.post('/api/v1/restaurant/createRestaurant').send(dataRestaurant)
                .expect('Content-Type', /application\/json/)
                .expect(400)

            console.log(response.body);
            expect(response.body.message).toStrictEqual("You have to specify the requested restaurant's data")
        }
    })
})

afterAll(async () =>{
    await server.close()
})