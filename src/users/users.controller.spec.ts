import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('whoami', () => {
    it('should return current user', async () => {
      const result = await controller.whoami({
        id: 1,
        email: 'test@test.com',
        password: '12345678',
      });

      expect(result.user.id).toEqual(1);
      expect(result.user.email).toEqual('test@test.com');
      expect(result.user.password).toEqual('12345678');
    });
  });
});
