import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JWTPayload } from 'src/common/dto/auth/auth.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'generated/prisma/client';
import { CreateUserDTO, toUserDTO, UserDTO } from 'src/common/dto/users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request & {user: User},
    @Res({ passthrough: true }) res: Response
  ): Promise<UserDTO> {
    await this.setupTokens(req.user, res);
    return toUserDTO(req.user);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDTO): Promise<UserDTO> {
    const newUser = await this.usersService.createUser(body);
    return toUserDTO(newUser);
  }


  private async setupTokens(user: User, res: Response): Promise<void> {
    const payload: JWTPayload = {id: user.id, isAdmin: user.isAdmin};
    const access = this.authService.getAccessTokenAndOptions(payload);
    const refresh = this.authService.getRefreshTokenAndOptions(payload);
    this.usersService.updateRefreshToken(user.id, refresh.token);
    res.cookie('jwt', access.token, access.options);
    res.cookie('refresh', refresh.token, refresh.options);
  }

}
