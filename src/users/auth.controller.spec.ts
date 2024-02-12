import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { compare, hash } from 'bcrypt';
import { ErrDuplicatedRecord } from '../error/error';
import { AuthController } from './auth.controller';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      create: (email: string, password: string) => {
        if (email == 'duplicate@duplicate.com') {
          throw new ErrDuplicatedRecord();
        }
        return Promise.resolve<User>({
          id: 1,
          email: email,
          password: password,
          reports: null,
        });
      },

      findByEmail: async (email: string) => {
        const hashp = await hash('12345678', 12);
        return Promise.resolve<User>({
          id: 1,
          email: email,
          password: hashp,
          reports: null,
        });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should creating user with hash password', async () => {
      const result = await controller.signup({
        email: 'test@test.com',
        password: '12345678',
      });

      expect(result.user.id).toEqual(1);
      expect(result.user.email).toEqual('test@test.com');

      const match = await compare('12345678', result.user.password);
      expect(match).toEqual(true);
      expect(result.message).toEqual('success');
    });

    it('should return bad request email in use', async () => {
      expect(async () => {
        return await controller.signup({
          email: 'duplicate@duplicate.com',
          password: '12345678',
        });
      }).rejects.toThrow(BadRequestException);
    });
  });

  describe('signin', () => {
    it('should login user and update session', async () => {
      const session = { userid: -10 };
      const result = await controller.signin(
        {
          email: 'test@test.com',
          password: '12345678',
        },
        session,
      );

      expect(result.message).toBe('success');
      expect(session.userid).toBe(1);
    });

    it('should return unautorized', async () => {
      expect(async () => {
        const session = { userid: -10 };
        await controller.signin(
          {
            email: 'test@test.com',
            password: '',
          },
          session,
        );
      }).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signout', () => {
    it('should logut user and update session to be null', async () => {
      const session = { userid: -10 };
      const result = controller.signout(session);

      expect(result.message).toEqual('success');
      expect(session.userid).toBeNull();
    });
  });
});
