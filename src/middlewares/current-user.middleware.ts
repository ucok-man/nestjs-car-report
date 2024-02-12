import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private service: UsersService) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    const { userid } = req.session || {};
    if (userid) {
      const user = await this.service.findById(userid);
      req.currentUser = user;
    }
    next();
  }
}
