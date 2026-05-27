import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { ImagesService } from './images.service';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':imageId')
  async getImage(@Param('imageId') imageId: string) {
    const image = await this.imagesService.getImage(imageId);
    return image.fileData;
  }

}