import { Injectable } from "@nestjs/common";
import { RestaurantCreateDTO } from "prisma/repositories/repository.dto";
import { RestaurantRepository } from "prisma/repositories/restaurant.repository";

@Injectable()
export class RestaurantsService {
    constructor(
        private readonly restaurantRepository: RestaurantRepository,
    ) {}
    

    async getRestaurants() {
        return await this.restaurantRepository.getRestaurants();
    }

    async createRestaurant(data: RestaurantCreateDTO) {
        return await this.restaurantRepository.createRestaurant(data);
    }
}