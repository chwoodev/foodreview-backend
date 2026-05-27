import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UsersService } from "./users.service";
import { ReviewsService } from "src/reviews/reviews.service";
import { JWTUser } from "src/common/decorators/jwtuser.decorator";
import { JWTPayload } from "src/common/dto/auth/auth.dto";
import { toUserDTO, UserDTO } from "src/common/dto/users/users.dto";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly reviewsService: ReviewsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@JWTUser() user: JWTPayload): Promise<UserDTO> {
    const userEntity = await this.usersService.getUserById(user.id);
    return toUserDTO(userEntity);
  }

//   @UseGuards(JwtAuthGuard)
//   @Get("reviews")
//   async getReviews(@JWTUser() user: JWTPayload){
//     const reviews = await this.reviewsService.getReviewsOfUser(user.id);
//     return reviews.map(toReviewWithLikesDTO(user.id));
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get("reviews/likes")
//   async getLikedReviews(@JWTUser() user: JWTPayload){
//     const reviews = await this.reviewsService.getReviewsLikedByUser(user.id);
//     return reviews.map(toReviewWithLikesDTO(user.id));
//   }
}
