import { Expose, Type } from 'class-transformer';
import { UserDTO } from './user.dto';

export class ResWhoamiDTO {
  @Type(() => UserDTO)
  @Expose()
  user: UserDTO;
}
