import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ReviewCreateInput } from "./repository.dto";
import { Image, Review } from "generated/prisma/client";

@Injectable()
export class ReviewRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createReview(data: ReviewCreateInput): Promise<Review> {
        return await this.prisma.review.create({data});
    }

    async createImage(userId: number, file: Express.Multer.File): Promise<Image> {
        const fileData = new Uint8Array(file.buffer.buffer, file.buffer.byteOffset, file.buffer.byteLength) as Uint8Array<ArrayBuffer>;
        return await this.prisma.image.create({
            data: {userId, fileData}
        });
    }
    
}