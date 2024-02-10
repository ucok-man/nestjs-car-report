import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { ResWhoamiDTO } from './dtos/res.users.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

// @Serialize(UserDTO)
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard)
  @Serialize(ResWhoamiDTO)
  @Get('/whoami')
  async whoami(@CurrentUser() user: User) {
    return { user };
  }
}
