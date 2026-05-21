import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { FindOneUserByEmailProviders } from './providers/find-one-user-by-email.providers';
import { CreateUserProviders } from './providers/create-user.providers';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';

describe('UserServices', () => {
    let service: UsersService;

    beforeEach(async () => {
        const mockCreateUserProvider: Partial<CreateUserProviders> = {
            createUser: (createUserDto: CreateUserDto) =>
                Promise.resolve({
                    id: 12,
                    firstName: createUserDto.firstName,
                    lastName: createUserDto.lastName ?? '',
                    email: createUserDto.email,
                    password: createUserDto.password,
                }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: CreateUserProviders,
                    useValue: mockCreateUserProvider,
                },
                { provide: DataSource, useValue: {} },
                { provide: getRepositoryToken(User), useValue: {} },
                { provide: CreateGoogleUserProvider, useValue: {} },
                { provide: FindOneByGoogleIdProvider, useValue: {} },
                { provide: FindOneUserByEmailProviders, useValue: {} },
                { provide: UsersCreateManyProvider, useValue: {} },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    describe('root', () => {
        it('Controller should be define', () => {
            expect(service).toBeDefined();
        });
    });

    describe('CreateUser', () => {
        it('Should be defined', () => {
            expect(service['createUser']).toBeDefined();
        });

        it('Should call createUser on CreateUserProvider', async () => {
            const user = await service.createUser({
                firstName: 'Bani',
                lastName: 'jhon',
                email: 'bani@bani.io',
                password: 'baniBani1234*',
            });

            expect(user.firstName).toEqual('Bani');
        });
    });
});
