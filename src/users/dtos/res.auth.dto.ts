import { Expose, Type } from 'class-transformer';
import { UserDTO } from './user.dto';

export class ResSignupDTO {
  @Type(() => UserDTO)
  @Expose()
  user: UserDTO;

  @Expose()
  message: string;
}

export class ResSigninDTO {
  @Expose()
  message: string;
}

export class ResSignoutDTO {
  @Expose()
  message: string;
}
