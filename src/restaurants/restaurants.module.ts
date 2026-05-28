import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { RestaurantsService } from "./restaurants.service";
import { RestaurantRepository } from "prisma/repositories/restaurant.repository";
import { RestaurantsController } from "./restaurants.controller";


@Module({
    providers: [RestaurantsService, RestaurantRepository],
    imports: [PrismaModule],
    exports: [RestaurantsService],
    controllers: [RestaurantsController]
})
export class RestaurantsModule {}