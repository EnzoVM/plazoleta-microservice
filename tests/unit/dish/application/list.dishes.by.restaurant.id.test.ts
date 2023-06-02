import DishPrismaRepository from "../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository"
import ListDishesByRestaurantId from "../../../../src/core/dish/application/list.dishes.by.restaurantId"

jest.mock("../../../../src/core/dish/infraestructure/prisma/dish.prisma.repository")

const arrayOfDishes = [
    {
        dishId: '08e7dfb7-e3c0-439f-81d6-a4eddc7313d5',
        dishName: 'Plato nuevo 2',
        categoryId: '2000002',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685141457/g8fwq9khikkdqqt1neys.jpg',
        dishActive: true
      },
      {
        dishId: '13a85e67-0006-4780-97f3-21edad5a804f',
        dishName: 'Plato nuevo 1',
        categoryId: '2000002',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685141453/wfbipk3t2vfxgdsp1kel.jpg',
        dishActive: true
      },
      {
        dishId: '14152d4e-c492-460d-8d50-31b95be85d1b',
        dishName: 'Plato nuevo 6',
        categoryId: '2000002',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685141460/x73ironohizxrmefuszi.jpg',
        dishActive: true
      },
      {
        dishId: '16c354f9-0d8c-4131-8344-82f0a4ea7a1e',
        dishName: 'Plato Prueba',
        categoryId: '2000001',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 30,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685049672/utxf87goknqfzfsilo5z.jpg',
        dishActive: true
      },
      {
        dishId: '1e69703a-6495-4d30-85e3-e33a8215e5d6',
        dishName: 'Plato nuevo 100',
        categoryId: '2000000',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685472662/kaf0nvjtsljqhqtxxzbd.jpg',
        dishActive: true
      },
      {
        dishId: '1e9d68a4-f134-436d-b2ba-0fc53bd7b33c',
        dishName: 'Plato nuevo 100',
        categoryId: '2000000',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685480721/k2tnkjguhq5kqtojtbxp.jpg',
        dishActive: true
      },
      {
        dishId: '44681f1e-cc48-4111-817b-9fbbc9ebdc76',
        dishName: 'Plato nuevo',
        categoryId: '2000001',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685049022/u4fv1xrlxrt0zjfti5ty.jpg',
        dishActive: true
      },
      {
        dishId: '4b3239b1-6ee2-4e8a-aa56-ab4e8bcdd411',
        dishName: 'Plato nuevo rrr',
        categoryId: '2000001',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685055440/njddolyy3rbfsthhjhc7.jpg',
        dishActive: true
      },
      {
        dishId: '53013158-5eb0-4b00-9fe3-d16434ca7382',
        dishName: 'Plato nuevo 9',
        categoryId: '2000000',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685141471/phdc5cjvmn4bi3fiqnwd.jpg',
        dishActive: true
      },
      {
        dishId: '55fd3268-5999-40a0-8e9a-54780df47179',
        dishName: 'Plato nuevo rrr',
        categoryId: '2000001',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685048987/tvzhy9m0quetymvyada3.jpg',
        dishActive: true
      },
      {
        dishId: '5da11ad9-9a2f-4cc4-9ae5-8b4654ed8866',
        dishName: 'Plato nuevo 100',
        categoryId: '2000000',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685141481/gwfe2glv8rqqoy7ociyy.jpg',
        dishActive: true
      },
      {
        dishId: '6a1747fa-2ab9-43f7-99e0-98e9d810f71d',
        dishName: 'Plato nuevo',
        categoryId: '2000001',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685049623/feskm5hsgdqbfobuqc2p.jpg',
        dishActive: true
      },
      {
        dishId: '703eab74-e4e8-446c-bdac-ccf3a32e7b84',
        dishName: 'Plato nuevo 7',
        categoryId: '2000002',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685141463/oeoyfqbwbi04fggoha0b.jpg',
        dishActive: true
      },
      {
        dishId: '722a850c-6591-4a6f-b292-2bd07249af60',
        dishName: 'Plato nuevo rrr',
        categoryId: '2000001',
        dishDescription: 'Esta descripcion fue actualizada',
        dishPrice: 80,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685040514/btcjfh6bm3exf27lzkb6.jpg',
        dishActive: false
      },
      {
        dishId: '72625025-162c-4ba0-b689-95b8293f8446',
        dishName: 'Plato nuevo 100',
        categoryId: '2000000',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685472755/yyqngqnbi22iwz3xxekl.jpg',
        dishActive: true
      },
      {
        dishId: '803ea09b-b293-4db6-b5cb-428e07f49657',
        dishName: 'Plato nuevo',
        categoryId: '2000001',
        dishDescription: 'Este es un plato de prueba',
        dishPrice: 20,
        restaurantId: 'de891602-ef54-46bc-9356-9e4bf666defc',
        dishUrlImage: 'https://res.cloudinary.com/enzogvm/image/upload/v1685048841/hx6x5puotypqpb3g3tkq.jpg',
        dishActive: true
      }
]

describe('List dishes by restaurant id', () => {

    test('List all dishes by Category and Items per Page successfully', async () => {
        const dishPrismaRepository = new DishPrismaRepository()

        const spyListDish = jest.spyOn(dishPrismaRepository, 'listDishesByRestaurantId')
        
        spyListDish.mockResolvedValueOnce(arrayOfDishes)

        const listDishesByRestaurantId = new ListDishesByRestaurantId(dishPrismaRepository)
        const listDishes = await listDishesByRestaurantId.listDishes(2, 'de891602-ef54-46bc-9356-9e4bf666defc')

        expect(listDishes[0].dishes[0]).toHaveLength(2)
        expect(listDishes[1].dishes[0]).toHaveLength(2)
    })
})