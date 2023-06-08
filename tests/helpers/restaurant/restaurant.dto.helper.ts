
export const restaurantDtoDataMissing = [
    {

    },
    {
        //restaurantName: "abc",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "7293688879321855281"
    },
    {
        restaurantName: "abc",
        //restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "7293688879321855281"
    },
    {
        restaurantName: "abc",
        restaurantNIT: 987457634,
        //restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "7293688879321855281"
    },
    {
        restaurantName: "abc",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        //restaurantPhoneNumber: "+734526754234",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "7293688879321855281"
    },
    {
        restaurantName: "abc",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234",
        //restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "7293688879321855281"
    },
    {
        restaurantName: "abc",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        //ownerId: "7293688879321855281"
    }
]


export const restaurantDtoDataValidate = [
    {
        restaurantName: "abc",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234444",  //Phone number is incorrect
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "7293688879321855281"
    },
    {
        restaurantName: "abc",
        restaurantNIT: "987457634",   //Restaurant NIT must be a number
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234",
        restaurantUrlLogo: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
        ownerId: "7293688879321855281"
    },
    {
        restaurantName: "abc",
        restaurantNIT: 987457634,
        restaurantAddress: "Av. Prueba 356",
        restaurantPhoneNumber: "+734526754234",
        restaurantUrlLogo: "ffegggegegeg",  //Wrong Url structure
        ownerId: "7293688879321855281"
    }
]