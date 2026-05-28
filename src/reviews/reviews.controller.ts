import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewCreateDTO } from 'prisma/repositories/repository.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JWTUser } from 'src/common/decorators/jwtuser.decorator';
import { JWTPayload } from 'src/common/dto/auth/auth.dto';
import { ReviewCreateBodyDTO } from 'src/common/dto/reviews/reviews.dto';



@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

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

}