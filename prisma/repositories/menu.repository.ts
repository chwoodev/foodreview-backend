import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Image, Menu, Restaurant } from 'generated/prisma/client';
import {
  MenuCreateInput,
  RestaurantCreateInput,
  StatUpdateInput,
} from './repository.dto';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMenus(id: number): Promise<Menu[]> {
    return await this.prisma.menu.findMany({ where: { restaurantId: id } });
  }

  async getMenu(id: number): Promise<Menu | null> {
    return await this.prisma.menu.findFirst({ where: { id } });
  }

  async createMenu(data: MenuCreateInput): Promise<Menu> {
    return await this.prisma.menu.create({ data });
  }

  async deleteMenu(id: number): Promise<Menu | null> {
    return await this.prisma.menu.delete({ where: { id } });
  }

  async updateStat(data: StatUpdateInput) {
    return await this.prisma.menu.update({
      where: { id: data.menuId },
      data: {
        sumTaste: { increment: data.tasteChange },
        sumAmount: { increment: data.amountChange },
        sumPrice: { increment: data.priceChange },
        reviewCount: { increment: data.reviewCountChange },
      },
    });
  }
}
