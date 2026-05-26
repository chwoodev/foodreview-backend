import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReviewPayload } from 'prisma/repositories/repository.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadReview(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') rawData: string,
  ) {
    let body: ReviewPayload;
    body = JSON.parse(rawData);
    return this.handleReviewUpload(body, file);
  }

  private async handleReviewUpload(
    body: ReviewPayload,
    file?: Express.Multer.File,
  ) {
    console.log(body);
    
    this.reviewsService.createReview({userId: 1, ...body});
    
  }
}
