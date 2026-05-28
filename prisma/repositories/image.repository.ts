import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Image } from "generated/prisma/client";

@Injectable()
export class ImageRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createImage(userId: number, imageData: string): Promise<Image> {
        const fileData = new Uint8Array(Buffer.from(imageData, "base64"));
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