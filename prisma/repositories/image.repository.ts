import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Image } from "generated/prisma/client";

@Injectable()
export class ImageRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createImage(userId: number, file: Express.Multer.File): Promise<Image> {
        const fileData = new Uint8Array(file.buffer.buffer, file.buffer.byteOffset, file.buffer.byteLength) as Uint8Array<ArrayBuffer>;
        return await this.prisma.image.create({
            data: {userId, fileData}
        });
    }

    async getImage(imageId: string): Promise<Image | null> {
        return await this.prisma.image.findUnique({
            where: {id: imageId}
        });
    }

    
}