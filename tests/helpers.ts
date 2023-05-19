
//Array for data testing
export const dataRestaurantMissing = [
    { 
        //Data is missing
    },
    {
        //restaurantName is missing
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+324563456812",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
    {
        //restaurantNIT is missing
        restaurantName: "RestaurantePrueba",
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+324563456812",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
    {
        //restaurantAddress is missing
        restaurantName: "RestaurantePrueba",
        restaurantNIT: 987457634,
        restaurantPhoneNumber: "+324563456812",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
    {
        //restaurantPhoneNumber is missing
        restaurantName: "RestaurantePrueba",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
    {
        //restaurantUrlLogo is missing
        restaurantName: "RestaurantePrueba",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+324563456812",
        ownerId: "3702913700919063608"
    },
    {
        //ownerId is missing
        restaurantName: "RestaurantePrueba",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+324563456812",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1"
    }
]


//Array for validate testing
export const dataRestaurantValidate = [
    {
        restaurantName: "RestaurantePrueba",
        restaurantNIT: "987457634",     //NIT is not numeric
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+324563456812",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
    {
        restaurantName: "RestaurantePrueba",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "324t63456rf2",  //the phoneNumber have letters
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
    {
        restaurantName: "RestaurantePrueba",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+32456345681245", //the phoneNumber have more than 13 caracteres
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
    {
        restaurantName: "123444555", //the name restaurant have just numbers
        restaurantNIT: 987457634, 
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+324563456812",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "3702913700919063608"
    },
]
