import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ReviewsModule } from "src/reviews/reviews.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [PrismaModule, ReviewsModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}