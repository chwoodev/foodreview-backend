import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JWTPayload, TokenAndCookieOptions, TokenRefreshPayload, toJWTPayload } from 'src/common/dto/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenInvalidException } from './strategies/refresh.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.getByUsername(username);
      const success = await bcrypt.compare(password, user.passwordHash);
      if (success) return user;
    } catch (e) {
      return null;
    }
    return null;
  }

  async refreshUserToken(userId: number, refreshToken: string): Promise<TokenRefreshPayload> {
    const user = await this.usersService.getUserById(userId);
    if (!user || user.refreshToken !== refreshToken) throw new RefreshTokenInvalidException();
    const payload: JWTPayload = { id: user.id, isAdmin: user.isAdmin };
    return {
      ...payload,
      access: this.getAccessTokenAndOptions(payload),
    };
  }


  //TODO! revert cookie domain
  
  getAccessTokenAndOptions(payload: JWTPayload): TokenAndCookieOptions {
    const token = this.jwtService.sign(toJWTPayload(payload), {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXP_SEC')}s`,
    });
    return {
      token,
      options: {
        domain: '',
        path: '/',
        httpOnly: true,
        maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXP_SEC')) * 1000,
      },
    };
  }

  getRefreshTokenAndOptions(payload: JWTPayload): TokenAndCookieOptions {
    const token = this.jwtService.sign(toJWTPayload(payload), {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXP_SEC')}s`,
    });
    return {
      token,
      options: {
        domain: '',
        path: '/',
        httpOnly: true,
        maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXP_SEC')) * 1000,
      },
    };
  }
}
