import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  RestaurantDTO,
  RestaurantCreateInput,
  RestaurantWithMenus,
  RestaurantWithMenusAndStat,
  RestaurantWithStat,
  StatUpdateInput,
} from './repository.dto';

@Injectable()
export class RestaurantRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toRestaurantDTO(restaurant: RestaurantWithStat): RestaurantDTO {
    const { stat, ...rest } = restaurant;
    return { ...rest, ...this.getStatFields(stat) };
  }

  private toRestaurantWithMenusDTO(restaurant: RestaurantWithMenusAndStat): RestaurantWithMenus {
    const { menus, ...rest } = restaurant;
    return {
      ...this.toRestaurantDTO(rest),
      menus: menus.map(({ stat, ...menu }) => menu),
    };
  }

  private getStatFields(stat: RestaurantWithStat['stat']) {
    return {
      sumTaste: stat?.sumTaste ?? 0,
      sumAmount: stat?.sumAmount ?? 0,
      sumPrice: stat?.sumPrice ?? 0,
      reviewCount: stat?.reviewCount ?? 0,
    };
  }

  async createRestaurant(data: RestaurantCreateInput): Promise<RestaurantDTO> {
    const restaurant = await this.prisma.restaurant.create({
      data: {
        ...data,
        stat: { create: {} },
      },
      include: { stat: true },
    });
    return this.toRestaurantDTO(restaurant);
  }

  async getRestaurants(): Promise<RestaurantDTO[]> {
    const restaurants = await this.prisma.restaurant.findMany({
      include: { stat: true },
    });
    return restaurants.map((restaurant) => this.toRestaurantDTO(restaurant));
  }

  async getPickerRestaurants(): Promise<RestaurantWithMenus[]> {
    const restaurants = await this.prisma.restaurant.findMany({
      include: {
        stat: true,
        menus: { include: { stat: true } },
      },
    });
    return restaurants.map((restaurant) => this.toRestaurantWithMenusDTO(restaurant));
  }

  async deleteRestaurant(id: number): Promise<RestaurantDTO | null> {
    const restaurant = await this.prisma.restaurant.delete({
      where: { id },
      include: { stat: true },
    });
    return this.toRestaurantDTO(restaurant);
  }

  async updateStat(data: StatUpdateInput) {
    return await this.prisma.stat.updateMany({
      where: { restaurant: { menus: { some: { id: data.menuId } } } },
      data: {
        sumTaste: { increment: data.tasteChange },
        sumAmount: { increment: data.amountChange },
        sumPrice: { increment: data.priceChange },
        reviewCount: { increment: data.reviewCountChange },
      },
    });
  }
}
