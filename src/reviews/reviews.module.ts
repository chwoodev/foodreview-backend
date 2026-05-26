import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { ReviewRepository } from "prisma/repositories/review.repository";


@Module({
    providers: [ReviewsService, ReviewRepository],
    imports: [PrismaModule],
    exports: [ReviewsService],
    controllers: [ReviewsController]
})
export class ReviewsModule {}