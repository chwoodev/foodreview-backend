import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { ReviewRepository } from "prisma/repositories/review.repository";
import { ImageRepository } from "prisma/repositories/image.repository";
import { MenuRepository } from "prisma/repositories/menu.repository";
import { RestaurantRepository } from "prisma/repositories/restaurant.repository";


@Module({
    providers: [ReviewsService, ReviewRepository, ImageRepository, MenuRepository, RestaurantRepository],
    imports: [PrismaModule],
    exports: [ReviewsService],
    controllers: [ReviewsController]
})
export class ReviewsModule {}