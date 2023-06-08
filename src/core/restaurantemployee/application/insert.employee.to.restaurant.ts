import RestaurantEmployeeIdGeneratorRepository from "../domain/restaurant.employee.id.generator.repository"
import RestaurantEmployee from "../domain/restaurant.employee.model"
import RestaurantEmployeePersistanceRepository from "../domain/restaurant.employee.persistance.repository"

export default class InsertEmployeeToRestaurant {
    private readonly restaurantEmployeePersistanceRepository: RestaurantEmployeePersistanceRepository
    private readonly restaurantEmployeeIdGeneratorRepository: RestaurantEmployeeIdGeneratorRepository
    
    constructor(restaurantEmployeePersistanceRepository: RestaurantEmployeePersistanceRepository,restaurantEmployeeIdGeneratorRepository: RestaurantEmployeeIdGeneratorRepository) {
        this.restaurantEmployeePersistanceRepository = restaurantEmployeePersistanceRepository,
        this.restaurantEmployeeIdGeneratorRepository = restaurantEmployeeIdGeneratorRepository
    }

    async insertEmployeeToRestaurant (restaurantId: string, chefId: string){
        try {
            const restaurantEmployeeFound = await this.restaurantEmployeePersistanceRepository.getRestaurantEmployeeById(chefId)
            if(restaurantEmployeeFound){
                throw new Error('This employee is already assigned to this restaurant')
            }

            const restaurantEmployeeId = this.restaurantEmployeeIdGeneratorRepository.generateRestaurantEmployeeId()
            const newRestaurantEmployee = new RestaurantEmployee({
                restaurantEmployeeId, 
                restaurantId, 
                chefId
            })
            const restaurantEmployeeSaved = await this.restaurantEmployeePersistanceRepository.insertEmployeeToRestaurant(newRestaurantEmployee)
            
            return restaurantEmployeeSaved

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}