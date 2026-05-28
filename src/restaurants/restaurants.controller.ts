import {
    Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JWTUser } from 'src/common/decorators/jwtuser.decorator';
import { JWTPayload } from 'src/common/dto/auth/auth.dto';
import { RestaurantCreateBodyDTO } from 'src/common/dto/restaurants/restaurants.dto';


@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}


  @Get()
  async getRestaurants() {
    return await this.restaurantsService.getRestaurants();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createRestaurant(
    @JWTUser() user: JWTPayload,
    @Body() data: RestaurantCreateBodyDTO
  ) {
    if(!user.isAdmin) throw new ForbiddenException();
    let restaurant = await this.restaurantsService.createRestaurant(data);
    return restaurant;
  }
  

}