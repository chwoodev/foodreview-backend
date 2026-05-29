import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':imageId')
  async getImage(@Param('imageId') imageId: string, @Res() res: Response) {
    const image = await this.imagesService.getImage(imageId);
    let uint8Array = image.fileData;
    const buffer = Buffer.from(uint8Array);
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

}