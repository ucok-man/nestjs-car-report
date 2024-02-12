/* eslint-disable @typescript-eslint/no-namespace */
import { User } from 'src/users/entity/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser: User | object;
    }
  }
}
