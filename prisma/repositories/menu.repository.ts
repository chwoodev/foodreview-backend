import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Menu } from 'generated/prisma/client';
import {
  MenuDTO,
  MenuCreateInput,
  StatUpdateInput,
  MenuWithStat,
} from './repository.dto';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toMenuDTO(menu: MenuWithStat): MenuDTO {
    const { stat, ...rest } = menu;
    return { ...rest, ...this.getStatFields(stat) };
  }

  private getStatFields(stat: MenuWithStat['stat']) {
    return {
      sumTaste: stat?.sumTaste ?? 0,
      sumAmount: stat?.sumAmount ?? 0,
      sumPrice: stat?.sumPrice ?? 0,
      reviewCount: stat?.reviewCount ?? 0,
    };
  }

  async getMenus(id: number): Promise<MenuDTO[]> {
    const menus = await this.prisma.menu.findMany({
      where: { restaurantId: id },
      include: { stat: true },
    });
    return menus.map((menu) => this.toMenuDTO(menu));
  }

  async getMenu(id: number): Promise<MenuDTO | null> {
    const menu = await this.prisma.menu.findFirst({
      where: { id },
      include: { stat: true },
    });
    return menu ? this.toMenuDTO(menu) : null;
  }

  async createMenu(data: MenuCreateInput): Promise<MenuDTO> {
    const menu = await this.prisma.menu.create({
      data: {
        ...data,
        stat: { create: {} },
      },
      include: { stat: true },
    });
    return this.toMenuDTO(menu);
  }

  async deleteMenu(id: number): Promise<MenuDTO | null> {
    const menu = await this.prisma.menu.delete({
      where: { id },
      include: { stat: true },
    });
    return this.toMenuDTO(menu);
  }

  async updateStat(data: StatUpdateInput) {
    return await this.prisma.stat.update({
      where: { menuId: data.menuId },
      data: {
        sumTaste: { increment: data.tasteChange },
        sumAmount: { increment: data.amountChange },
        sumPrice: { increment: data.priceChange },
        reviewCount: { increment: data.reviewCountChange },
      },
    });
  }
}
