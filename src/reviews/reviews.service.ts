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

  async getReviews() {
    return await this.reviewRepository.getReviews();
  }

  async getReview(id: number) {
    return await this.reviewRepository.getReview(id);
  }

  async getMyReviews(id: number) {
    return await this.reviewRepository.getMyReviews(id);
  }

  async getReviewsForMenu(id: number) {
    return await this.reviewRepository.getReviewsForMenu(id);
  }

  async deleteReview(id: number) {
    let review = await this.reviewRepository.getReview(id);
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

    return await this.reviewRepository.deleteReview(id);
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
}
