import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewCreateDTO } from 'prisma/repositories/repository.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JWTUser } from 'src/common/decorators/jwtuser.decorator';
import { JWTPayload } from 'src/common/dto/auth/auth.dto';
import { ReviewCreateBodyDTO } from 'src/common/dto/reviews/reviews.dto';
import { Public } from 'src/auth/decorator/skip-auth.decorator';



@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}


  @Get()
  @Public()
  @UseGuards(JwtAuthGuard)
  async getReviews(@JWTUser() user?: JWTPayload) {
    return await this.reviewsService.getReviews(user?.id);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyReviews(@JWTUser() user: JWTPayload) {
    return await this.reviewsService.getMyReviews(user.id);
  }

  @Get('menu/:menuId')
  @Public()
  @UseGuards(JwtAuthGuard)
  async getReviewsForMenu(
    @Param('menuId') id: number,
    @JWTUser() user?: JWTPayload
  ) {
    return await this.reviewsService.getReviewsForMenu(id, user?.id);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  async uploadReview(
    @JWTUser() user: JWTPayload,
    @Body() data: ReviewCreateBodyDTO
  ) {
    let payload: ReviewCreateDTO = {userId: user.id, ...data};
    let review = await this.reviewsService.createReview(payload);
    return review;
  }

  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  async deleteReview(
    @JWTUser() user: JWTPayload,
    @Param('reviewId') id: number
  ) {
    let review = await this.reviewsService.getReview(id, user.id);
    if(!review) throw new NotFoundException();
    if(user.id != review.userId && !user.isAdmin) throw new UnauthorizedException();
    return await this.reviewsService.deleteReview(id, user.id);
  }

  @Post(':reviewId/like')
  @UseGuards(JwtAuthGuard)
  async likeReview(
    @JWTUser() user: JWTPayload,
    @Param('reviewId') id: number
  ) {
    return await this.reviewsService.likeReview(user.id, id);
  }

  @Delete(':reviewId/like')
  @UseGuards(JwtAuthGuard)
  async removeLike(
    @JWTUser() user: JWTPayload,
    @Param('reviewId') id: number
  ) {
    return await this.reviewsService.removeLike(user.id, id);
  }

}
