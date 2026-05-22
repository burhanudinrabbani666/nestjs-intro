import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProviders } from './create-user.providers';
import { MailService } from '../../mail/mail.service';
import { HasingProviders } from '../../auth/providers/hasing.providers';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { BadRequestException, ConflictException } from '@nestjs/common';

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
    let usersRepository: MockRepository;
    const user = {
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
                    useValue: createMockRepository(),
                },
            ],
        }).compile();

        providers = module.get<CreateUserProviders>(CreateUserProviders);
        usersRepository = module.get(getRepositoryToken(User));
    });

    it('Should be defined', () => {
        expect(providers).toBeDefined();
    });

    describe('create User', () => {
        describe('When the user does not Exist in database', () => {
            it('should create a new User', async () => {
                usersRepository.findOne?.mockReturnValue(null);
                usersRepository.create?.mockReturnValue(user);
                usersRepository.save?.mockReturnValue(user);
                const newUser = await providers.createUser(user);

                expect(newUser).toBeDefined();

                expect(usersRepository.findOne).toHaveBeenCalledWith({
                    where: { email: newUser.email },
                });

                expect(usersRepository.create).toHaveBeenCalledWith(user);
                expect(usersRepository.save).toHaveBeenCalledWith(user);
            });
        });

        describe('When the user exist in database', () => {
            it('throw badRequsestException', async () => {
                usersRepository.findOne?.mockReturnValue(user.email);
                usersRepository.create?.mockReturnValue(user);
                usersRepository.save?.mockReturnValue(user);

                try {
                    const newUser = await providers.createUser(user);
                } catch (error) {
                    expect(error).toBeInstanceOf(ConflictException);
                }
            });
        });
    });
});
