
export const dishDtoDataMissing = [
    {

    },
    {
        //dishName: "Plato nuevo",
        categoryId: "2000000",
        dishDescription: "Esta es la descripcion del plato",
        dishPrice: 55,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    },
    {
        dishName: "Plato nuevo",
        //categoryId: "2000000",
        dishDescription: "Esta es la descripcion del plato",
        dishPrice: 55,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000000",
        //dishDescription: "Esta es la descripcion del plato",
        dishPrice: 55,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000000",
        dishDescription: "Esta es la descripcion del plato",
        //dishPrice: 55,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000000",
        dishDescription: "Esta es la descripcion del plato",
        dishPrice: 55,
        //restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000000",
        dishDescription: "Esta es la descripcion del plato",
        dishPrice: 55,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        //dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    }
]


export const dishDtoDataValidate = [
    {
        dishName: "Plato nuevo",
        categoryId: "2000000",
        dishDescription: "Esta es la descripcion del plato",
        dishPrice: "55",  //Price must be a number
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000000",
        dishDescription: "Esta es la descripcion del plato",
        dishPrice: 55,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "frfrfrfrfrrf",    //Wrong Url structure
    },
    {
        dishName: "Plato nuevo",
        categoryId: 2000000,  //CategoryId must be a string
        dishDescription: "Esta es la descripcion del plato",
        dishPrice: 55,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
    }
]