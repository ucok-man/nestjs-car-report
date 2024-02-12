import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.currentUser;
  },
);
