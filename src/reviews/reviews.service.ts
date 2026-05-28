import { Injectable } from "@nestjs/common";
import { ImageRepository } from "prisma/repositories/image.repository";
import { ReviewCreateDTO, ReviewCreateInput } from "prisma/repositories/repository.dto";
import { ReviewRepository } from "prisma/repositories/review.repository";

@Injectable()
export class ReviewsService {
    constructor(
        private readonly reviewRepository: ReviewRepository,
        private readonly imageRepository: ImageRepository
    ) {}
    

    async createReview(data: ReviewCreateDTO) {
        const { imageData, ...rest } = data;
        const image = await this.imageRepository.createImage(data.userId, imageData);
        const imageId = image.id;
        const reviewData: ReviewCreateInput = { ...rest, imageId };
        return await this.reviewRepository.createReview(reviewData);
    }
}