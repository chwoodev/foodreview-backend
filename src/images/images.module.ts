import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ImageRepository } from "prisma/repositories/image.repository";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";


@Module({
    providers: [ImagesService, ImageRepository],
    imports: [PrismaModule],
    exports: [ImagesService],
    controllers: [ImagesController]
})
export class ImagesModule {}