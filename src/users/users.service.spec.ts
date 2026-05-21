import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UserServices', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    describe('root', () => {
        it('Controller should be define', () => {});
    });
});
