import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ImageRepository } from "./repositories/image.repository";
import { ReviewRepository } from "./repositories/review.repository";
import { UserRepository } from "./repositories/user.repository";

@Module({
    providers: [
        PrismaService,
        ImageRepository,
        ReviewRepository,
        UserRepository
    ],
    exports: [
        PrismaService,
        ImageRepository,
        ReviewRepository,
        UserRepository
    ]
})
export class PrismaModule {}
