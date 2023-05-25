
//Array for data testing
export const dishDataForCreate = [
    {
        //All the data is missing
    },
    {
        //Name is missing
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
    },
    {
        //Category id is missing
        dishName: "Plato nuevo",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
    },
    {
        //Description is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishPrice: 20,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
    },
    {
        //Price is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
    },
    {
        //Restaurant id is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
    },
    {
        //URL image is missing
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20,
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc"
    }
]

export const dishDataForUpdate = [
    {
        //All data is missing
    },
    {
        //Description is missing
        dishPrice: 65
    },
    {
        //Price is missing
        dishDescription: "Esta es la descripcion cambiada"
    }
]



//Array for validate testing
export const dishDataValidateForCreate = [
    {
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 20.30, //Price is not an integer
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: -20, //Price is not positive and greater than 0
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solar-orbiter-toma-imagenes-del-sol-como-nunca-antes/9437612-1-esl-MX/Solar-Orbiter-toma-imagenes-del-Sol-como-nunca-antes.jpg"
    },
    {
        dishName: "Plato nuevo",
        categoryId: "2000001",
        dishDescription: "Este es un plato de prueba",
        dishPrice: 100, 
        restaurantId: "de891602-ef54-46bc-9356-9e4bf666defc",
        dishUrlImage: "urlPrueba"  //URL is wrong
    }
]

export const dishDataValidateForUpdate = [
    {
        dishDescription: 30,  //Description is not a string
        dishPrice: 85
    },
    {
        dishDescription: 'Esta descripcion de prueba esta cambiada',
        dishPrice: 85.40  //Price is not an integer
    },
    {
        dishDescription: 'Esta descripcion de prueba esta cambiada',
        dishPrice: -20   //Price is not positive and greater than 0
    }
]