import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JWTUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
});
