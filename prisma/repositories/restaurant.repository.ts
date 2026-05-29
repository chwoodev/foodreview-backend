import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Image, Restaurant } from 'generated/prisma/client';
import {
  RestaurantCreateInput,
  RestaurantWithMenus,
  StatUpdateInput,
} from './repository.dto';

@Injectable()
export class RestaurantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRestaurant(data: RestaurantCreateInput): Promise<Restaurant> {
    return await this.prisma.restaurant.create({ data });
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return await this.prisma.restaurant.findMany();
  }

  async getPickerRestaurants(): Promise<RestaurantWithMenus[]> {
    return await this.prisma.restaurant.findMany({ include: { menus: true } });
  }

  async deleteRestaurant(id: number): Promise<Restaurant | null> {
    return await this.prisma.restaurant.delete({ where: { id } });
  }

  async updateStat(data: StatUpdateInput) {
    return await this.prisma.restaurant.updateMany({
      where: { menus: { some: { id: data.menuId } } },
      data: {
        sumTaste: { increment: data.tasteChange },
        sumAmount: { increment: data.amountChange },
        sumPrice: { increment: data.priceChange },
        reviewCount: { increment: data.reviewCountChange },
      },
    });
  }
}
