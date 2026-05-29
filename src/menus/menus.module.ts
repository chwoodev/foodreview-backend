import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { RestaurantRepository } from "prisma/repositories/restaurant.repository";
import { MenusService } from "./menus.service";
import { MenusController } from "./menus.controller";
import { MenuRepository } from "prisma/repositories/menu.repository";


@Module({
    providers: [MenusService, MenuRepository],
    imports: [PrismaModule],
    exports: [MenusService],
    controllers: [MenusController]
})
export class MenusModule {}