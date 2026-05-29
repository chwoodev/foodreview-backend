import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ReviewCreateInput, ReviewDTO, ReviewWithLikeInfo } from "./repository.dto";

@Injectable()
export class ReviewRepository {
    constructor(private readonly prisma: PrismaService) {}

    private withLikeInfo(review: ReviewWithLikeInfo): ReviewDTO {
        const { _count, likes, ...rest } = review;
        return { ...rest, likeCount: _count.likes, liked: likes.length > 0 };
    }

    private reviewInclude(userId?: number) {
        return {
            _count: { select: { likes: true } },
            likes: {
                where: { userId: userId ?? -1 },
                select: { id: true },
            },
        };
    }

    async getReviews(userId?: number): Promise<ReviewDTO[]> {
        const reviews = await this.prisma.review.findMany({
            include: this.reviewInclude(userId),
            orderBy: {createdAt: 'desc'}
        });
        return reviews.map((review) => this.withLikeInfo(review));
    }

    async getReview(id: number, userId?: number): Promise<ReviewDTO | null> {
        const review = await this.prisma.review.findFirst({
            where: {id},
            include: this.reviewInclude(userId),
        });
        return review ? this.withLikeInfo(review) : null;
    }

    async getMyReviews(id: number): Promise<ReviewDTO[]> {
        const reviews = await this.prisma.review.findMany({
            where:{userId: id},
            include: this.reviewInclude(id),
            orderBy: {createdAt: 'desc'}
        });
        return reviews.map((review) => this.withLikeInfo(review));
    }

    async getReviewsForMenu(id: number, userId?: number): Promise<ReviewDTO[]> {
        const reviews = await this.prisma.review.findMany({
            where: {menuId: id},
            include: this.reviewInclude(userId),
            orderBy: {createdAt: 'desc'}
        });
        return reviews.map((review) => this.withLikeInfo(review));
        
    }

    async deleteReview(id: number, userId?: number): Promise<ReviewDTO | null> {
        const review = await this.prisma.review.delete({
            where: {id},
            include: this.reviewInclude(userId),
        });
        return this.withLikeInfo(review);
    }

    async createReview(data: ReviewCreateInput): Promise<ReviewDTO> {
        const review = await this.prisma.review.create({
            data,
            include: this.reviewInclude(data.userId),
        });
        return this.withLikeInfo(review);
    }

    async likeReview(userId: number, reviewId: number) {
        return await this.prisma.reviewLike.upsert({
            where: {
                userId_reviewId: { userId, reviewId },
            },
            update: {},
            create: { userId, reviewId },
        });
    }

    async removeLike(userId: number, reviewId: number) {
        return await this.prisma.reviewLike.deleteMany({
            where: { userId, reviewId },
        });
    }
    
}
