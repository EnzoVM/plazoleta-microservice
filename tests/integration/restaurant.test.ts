import index from '../../src/index'
import request from 'supertest'

const {app, server} = index
const api = request(app)
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MTYyMjM3NjYzNTU2NDk0NjQ5IiwidXNlclJvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjg0ODAwNTgwfQ.2XyADUiWdkhUySKHMl9VwBKoVNe-usyQqKCxBy51ZX4'
const ownerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MjkzNjg4ODc5MzIxODU1MjgxIiwidXNlclJvbGUiOiJPd25lciIsImlhdCI6MTY4NTAzOTY4OX0.BPB1Na1rTwqKDdvp8EGKl25psADCUrj9HPLQF6OKs5o'
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
})

afterAll(async () =>{
    await server.close()
})