import Restaurant from "../../../../src/core/restaurant/domain/restaurant.model"
import RestaurantUuidRepository from "../../../../src/core/restaurant/infraestructure/uuid/restaurant.uuid.repository"

const restaurantId: jest.Mocked<RestaurantUuidRepository> = {
    generateRestaurantId: jest.fn(() => 'rgtfrdt344tt-tygdddwww2-ffgtgthwe34')
}

describe('Restaurant model', () => {

    test('Should create a new Restaurant Object', () => {
        const newRestaurant = new Restaurant({
            restaurantId: restaurantId.generateRestaurantId(),
            restaurantName: "Restaurante Nuevo",
            restaurantNIT: 987457634,
            restaurantAddress: "Av. Prueba 356",
            restaurantPhoneNumber: "+734526754234",
            restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
            ownerId: "7293688879321855281"
        })
        
        expect(newRestaurant.restaurantId).toBe('rgtfrdt344tt-tygdddwww2-ffgtgthwe34')
    })

})