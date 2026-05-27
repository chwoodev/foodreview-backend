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
    

    async createReview(data: ReviewCreateDTO, file: Express.Multer.File) {
        const image = await this.imageRepository.createImage(data.userId, file);
        const imageId = image.id;
        const reviewData: ReviewCreateInput = { ...data, imageId };
        return await this.reviewRepository.createReview(reviewData);
    }
}