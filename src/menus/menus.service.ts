import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuRepository } from 'prisma/repositories/menu.repository';
import {
  MenuCreateDTO,
  RestaurantCreateDTO,
  StatUpdateInput,
} from 'prisma/repositories/repository.dto';
import { RestaurantRepository } from 'prisma/repositories/restaurant.repository';

@Injectable()
export class MenusService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async getMenus(id: number) {
    return await this.menuRepository.getMenus(id);
  }

  async createMenu(id: number, data: MenuCreateDTO) {
    return await this.menuRepository.createMenu({ ...data, restaurantId: id });
  }

  async deleteMenu(id: number) {
    let menu = await this.menuRepository.getMenu(id);
    if (!menu) throw new NotFoundException();

    let changes: StatUpdateInput = {
      menuId: menu.id,
      amountChange: -menu.sumAmount,
      tasteChange: -menu.sumTaste,
      priceChange: -menu.sumPrice,
      reviewCountChange: -menu.reviewCount,
    };

    await this.restaurantRepository.updateStat(changes);

    return await this.menuRepository.deleteMenu(id);
  }
}
