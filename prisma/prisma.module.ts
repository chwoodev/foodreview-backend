import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ImageRepository } from "./repositories/image.repository";
import { ReviewRepository } from "./repositories/review.repository";
import { UserRepository } from "./repositories/user.repository";
import { RestaurantRepository } from "./repositories/restaurant.repository";
import { MenuRepository } from "./repositories/menu.repository";

@Module({
    providers: [
        PrismaService,
        ImageRepository,
        ReviewRepository,
        UserRepository,
        RestaurantRepository,
        MenuRepository
    ],
    exports: [
        PrismaService,
        ImageRepository,
        ReviewRepository,
        UserRepository,
        RestaurantRepository,
        MenuRepository
    ]
})
export class PrismaModule {}
