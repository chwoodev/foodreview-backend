import { Injectable } from "@nestjs/common";
import { CreateReviewDTO } from "prisma/repositories/repository.dto";
import { ReviewRepository } from "prisma/repositories/review.repository";

@Injectable()
export class ReviewsService {
    constructor(
        private readonly reviewRepository: ReviewRepository
    ) {}

    async createReview(data: CreateReviewDTO) {
        await this.reviewRepository.createReview(data);
    }
}