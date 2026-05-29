import { Injectable } from "@nestjs/common";
import { MenuRepository } from "prisma/repositories/menu.repository";
import { MenuCreateDTO, RestaurantCreateDTO } from "prisma/repositories/repository.dto";
import { RestaurantRepository } from "prisma/repositories/restaurant.repository";

@Injectable()
export class MenusService {
    constructor(
        private readonly menuRepository: MenuRepository,
    ) {}
    

    async getMenus(id: number) {
        return await this.menuRepository.getMenus(id);
    }

    async createMenu(id:number, data: MenuCreateDTO) {
        return await this.menuRepository.createMenu({...data, restaurantId: id});
    }

    // async deleteRestaurant(id: number) {
    //     return await this.restaurantRepository.deleteRestaurant(id);
    // }
}