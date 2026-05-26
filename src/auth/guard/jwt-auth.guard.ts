import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/skip-auth.decorator';
import { JWTPayload, TokenRefreshPayload } from 'src/common/dto/auth/auth.dto';
import { RefreshTokenInvalidException } from '../refresh.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt', 'refresh']) implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    try{
      const auth = await super.canActivate(context);
      if(!auth)return isPublic;

      const user = req.user as JWTPayload | TokenRefreshPayload;

      if('access' in user){
        const {access, ...newPayload} = user;
        req.user = newPayload;
        res.cookie('jwt', access.token, access.options);
      }

      return true;
    }catch(err) {
      if(err instanceof RefreshTokenInvalidException)
        throw new UnauthorizedException(err.message);
      if(isPublic)return true;
      throw err;
    }
  }
}
