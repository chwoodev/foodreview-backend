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

    async getReview(id: number): Promise<Review | null> {
        return await this.prisma.review.findFirst({where: {id}});
    }

    async getMyReviews(id: number): Promise<Review[]> {
        return await this.prisma.review.findMany({where:{userId: id}, orderBy: {createdAt: 'desc'}});
    }

    async getReviewsForMenu(id: number): Promise<Review[]> {
        return await this.prisma.review.findMany({where: {menuId: id}, orderBy: {createdAt: 'desc'}});
        
    }

    async deleteReview(id: number): Promise<Review | null> {
        return await this.prisma.review.delete({where: {id}});
    }

    async createReview(data: ReviewCreateInput): Promise<Review> {
        return await this.prisma.review.create({data});
    }
    
}