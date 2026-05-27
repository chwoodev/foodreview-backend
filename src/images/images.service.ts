import { Injectable, NotFoundException } from "@nestjs/common";
import { ImageRepository } from "prisma/repositories/image.repository";


@Injectable()
export class ImagesService {
    constructor(
        private readonly imageRepository: ImageRepository
    ) {}


    async getImage(imageId: string) {
        const image = await this.imageRepository.getImage(imageId);
        if (image == null) throw new NotFoundException();
        return image;
    }

}