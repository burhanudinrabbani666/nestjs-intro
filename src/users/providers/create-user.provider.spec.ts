import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProviders } from './create-user.providers';
import { MailService } from '../../mail/mail.service';
import { HasingProviders } from '../../auth/providers/hasing.providers';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users.entity';

type MockRepository<T extends ObjectLiteral = any> = Partial<
    Record<keyof Repository<T>, jest.Mock>
>;

const createMockRepository = <
    T extends ObjectLiteral = any,
>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
});

describe('CreateUserProvider', () => {
    let providers: CreateUserProviders;
    let userRepository: MockRepository;
    const user: Partial<User> = {
        firstName: 'Bani',
        lastName: 'Goat',
        email: 'Bani@bann.io',
        password: 'password',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserProviders,
                {
                    provide: MailService,
                    useValue: {
                        sendUserWelcome: jest.fn(() => Promise.resolve()),
                    },
                },
                {
                    provide: HasingProviders,
                    useValue: {
                        hashPassword: jest.fn(() => user.password),
                    },
                },
                { provide: DataSource, useValue: {} },
                {
                    provide: getRepositoryToken(User),
                    useValue: createMockRepository,
                },
            ],
        }).compile();

        providers = module.get<CreateUserProviders>(CreateUserProviders);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('Should be defined', () => {
        expect(providers).toBeDefined();
    });
});
