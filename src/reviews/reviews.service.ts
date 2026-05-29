import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageRepository } from 'prisma/repositories/image.repository';
import { MenuRepository } from 'prisma/repositories/menu.repository';
import {
  ReviewCreateDTO,
  ReviewCreateInput,
  StatUpdateInput,
} from 'prisma/repositories/repository.dto';
import { RestaurantRepository } from 'prisma/repositories/restaurant.repository';
import { ReviewRepository } from 'prisma/repositories/review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly menuRepository: MenuRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly imageRepository: ImageRepository,
  ) {}

  async getReviews(userId?: number) {
    return await this.reviewRepository.getReviews(userId);
  }

  async getReview(id: number, userId?: number) {
    return await this.reviewRepository.getReview(id, userId);
  }

  async getMyReviews(id: number) {
    return await this.reviewRepository.getMyReviews(id);
  }

  async getReviewsForMenu(id: number, userId?: number) {
    return await this.reviewRepository.getReviewsForMenu(id, userId);
  }

  async deleteReview(id: number, userId?: number) {
    let review = await this.reviewRepository.getReview(id, userId);
    if (!review) throw new NotFoundException();

    let changes: StatUpdateInput = {
      menuId: review.menuId,
      amountChange: -review.amount,
      tasteChange: -review.taste,
      priceChange: -review.price,
      reviewCountChange: -1,
    };

    await Promise.all([
      this.menuRepository.updateStat(changes),
      this.restaurantRepository.updateStat(changes),
    ]);

    return await this.reviewRepository.deleteReview(id, userId);
  }

  async createReview(data: ReviewCreateDTO) {
    const { imageData, ...rest } = data;
    const image = await this.imageRepository.createImage(
      data.userId,
      imageData,
    );
    const imageId = image.id;
    const reviewData: ReviewCreateInput = { ...rest, imageId };

    let changes: StatUpdateInput = {
      menuId: data.menuId,
      amountChange: data.amount,
      tasteChange: data.taste,
      priceChange: data.price,
      reviewCountChange: 1,
    };

    await Promise.all([
      this.menuRepository.updateStat(changes),
      this.restaurantRepository.updateStat(changes),
    ]);

    return await this.reviewRepository.createReview(reviewData);
  }

  async likeReview(userId: number, reviewId: number) {
    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) throw new NotFoundException();
    await this.reviewRepository.likeReview(userId, reviewId);
    return { liked: true };
  }

  async removeLike(userId: number, reviewId: number) {
    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) throw new NotFoundException();
    await this.reviewRepository.removeLike(userId, reviewId);
    return { liked: false };
  }
}
