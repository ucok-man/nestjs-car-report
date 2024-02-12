import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReqSigninDTO, ReqSignupDTO } from './dtos/req.auth.dto';
import { ResSignupDTO } from './dtos/res.auth.dto';
import { ErrDuplicatedRecord, ErrEmptyRecord } from './error/error';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private service: UsersService) {}

  @Serialize(ResSignupDTO)
  @Post('/signup')
  @HttpCode(201)
  async signup(@Body() body: ReqSignupDTO) {
    try {
      const hashp = await hash(body.password, 12);
      const user = await this.service.create(body.email, hashp);
      return { user, message: 'success' };
    } catch (error) {
      if (error instanceof ErrDuplicatedRecord) {
        throw new BadRequestException('email in use');
      }
      throw error;
    }
  }

  @Post('/signin')
  @HttpCode(200)
  async signin(
    @Body() body: ReqSigninDTO,
    @Session() session: { userid: number },
  ) {
    try {
      const user = await this.service.findByEmail(body.email);
      const match = await compare(body.password, user.password);
      if (!match) {
        throw new UnauthorizedException('invalid email or password');
      }
      session.userid = user.id; // set session
      return { message: 'success' };
    } catch (error) {
      if (error instanceof ErrEmptyRecord) {
        throw new UnauthorizedException('invalid email or password');
      }
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('/signout')
  @HttpCode(200)
  signout(@Session() session: { userid: number | null }) {
    session.userid = null;
    return { message: 'success' };
  }
}
