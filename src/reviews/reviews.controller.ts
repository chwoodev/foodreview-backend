import {
  BadRequestException,
  Body,
  Controller,
  Injectable,
  PipeTransform,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReviewCreateDTO, ReviewPayload } from 'prisma/repositories/repository.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JWTUser } from 'src/common/decorators/jwtuser.decorator';
import { JWTPayload } from 'src/common/dto/auth/auth.dto';
import { ReviewCreateBodyDTO } from 'src/common/dto/reviews/reviews.dto';


@Injectable()
export class ParseJsonPipe implements PipeTransform {
  transform(value: any) {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadReview(
    @JWTUser() user: JWTPayload,
    @UploadedFile() file: Express.Multer.File,
    @Body('data', ParseJsonPipe, new ValidationPipe({ transform: true })) data: ReviewCreateBodyDTO
  ) {
    let payload: ReviewCreateDTO = {userId: user.id, ...data};
    let review = await this.reviewsService.createReview(payload, file);
    return review;
  }

}