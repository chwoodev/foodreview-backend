import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ReviewCreateInput } from "./repository.dto";
import { Review } from "generated/prisma/client";

@Injectable()
export class ReviewRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getReviews(): Promise<Review[]> {
        return await this.prisma.review.findMany({orderBy: {createdAt: 'desc'}});
    }

    async createReview(data: ReviewCreateInput): Promise<Review> {
        return await this.prisma.review.create({data});
    }
    
}