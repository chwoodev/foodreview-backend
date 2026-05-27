import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { JWTPayload } from 'src/common/dto/auth/auth.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        req => req?.cookies?.refresh
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET')!,
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: JWTPayload) {
    const refreshToken = request.cookies.refresh;
    return await this.authService.refreshUserToken(
      payload.id,
      refreshToken
    );
  }
}


export class RefreshTokenInvalidException extends Error {
  constructor(msg?: string) {
    super(msg || 'Refresh token invalid');
  }
}
