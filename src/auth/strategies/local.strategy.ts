import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'generated/prisma/client';

type LocalAuthUser = User;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<LocalAuthUser> {
    const user = await this.authService.validateUser(email, password);
    if(!user) throw new UnauthorizedException();
    return user;
  }
}
