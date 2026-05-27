import { Injectable } from "@nestjs/common";
import { ReviewCreateDTO, ReviewCreateInput } from "prisma/repositories/repository.dto";
import { ReviewRepository } from "prisma/repositories/review.repository";

@Injectable()
export class ReviewsService {
    constructor(
        private readonly reviewRepository: ReviewRepository,
    ) {}
    

    async createReview(data: ReviewCreateDTO, file: Express.Multer.File) {
        const image = await this.reviewRepository.createImage(data.userId, file);
        const imageId = image.id;
        const reviewData: ReviewCreateInput = { ...data, imageId };
        return await this.reviewRepository.createReview(reviewData);
    }
}