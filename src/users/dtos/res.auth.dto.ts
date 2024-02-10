import { Expose, Type } from 'class-transformer';
import { UserDTO } from './user.dto';

export class ResSignupDTO {
  @Type(() => UserDTO)
  @Expose()
  user: UserDTO;

  @Expose()
  message: string;
}
