
//Array for data testing
export const dataDishMissing = [
    {
        //All the data is missing
    },
    {
        //Dish name is missing
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
        dishUrlImage: "urldeprueba"
    },
    {
        //Category Id is missing
        dishName: "Plato nuevo",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
        dishUrlImage: "urldeprueba"
    },
    {
        //Dish description is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishPrice: 20,
        restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
        dishUrlImage: "urldeprueba"
    },
    {
        //Dish price is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
        dishUrlImage: "urldeprueba"
    },
    {
        //Restaurant id is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        dishUrlImage: "urldeprueba"
    },
    {
        //Dish URL image is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950"
    }
]

//Array for validate testing
export const dishPriceValidator = [
    {
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20.30, //Dish price is not integer
        restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
        dishUrlImage: "urldeprueba"
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: -20, //Dish price is not positive and greater than 0
        restaurantId: "1a2a730e-ee3c-4d4f-9f19-2cab34838950",
        dishUrlImage: "urldeprueba"
    }
]