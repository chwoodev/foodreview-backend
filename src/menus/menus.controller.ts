import {
    Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JWTUser } from 'src/common/decorators/jwtuser.decorator';
import { JWTPayload } from 'src/common/dto/auth/auth.dto';
import { RestaurantCreateBodyDTO } from 'src/common/dto/restaurants/restaurants.dto';
import { MenusService } from './menus.service';
import { MenuCreateBodyDTO } from 'src/common/dto/menus/menus.dto';


@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}


  @Get('restaurant/:restaurantId')
  async getMenus(@Param('restaurantId') id: number) {
    return await this.menusService.getMenus(id);
  }

  @Post('restaurant/:restaurantId/create')
  @UseGuards(JwtAuthGuard)
  async createRestaurant(
    @JWTUser() user: JWTPayload,
    @Body() data: MenuCreateBodyDTO,
    @Param('restaurantId') id: number
  ) {
    if(!user.isAdmin) throw new ForbiddenException();
    let menu = await this.menusService.createMenu(id, data);
    return menu;
  }


  // @Delete(':restaurantId')
  // @UseGuards(JwtAuthGuard)
  // async deleteRestaurant(
  //   @JWTUser() user: JWTPayload,
  //   @Param('restaurantId') id: number
  // ) {
  //   if(!user.isAdmin) throw new ForbiddenException();
  //   let restaurant = await this.restaurantsService.deleteRestaurant(id);
  //   return restaurant;
  // }
  

}