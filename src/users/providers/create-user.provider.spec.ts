import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProviders } from './create-user.providers';
import { MailService } from '../../mail/mail.service';
import { HasingProviders } from '../../auth/providers/hasing.providers';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users.entity';

describe('CreateUserProvider', () => {
    let providers: CreateUserProviders;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserProviders,
                { provide: MailService, useValue: {} },
                { provide: HasingProviders, useValue: {} },
                { provide: DataSource, useValue: {} },
                { provide: getRepositoryToken(User), useValue: {} },
            ],
        }).compile();

        providers = module.get<CreateUserProviders>(CreateUserProviders);
    });

    it('Should be defined', () => {
        expect(providers).toBeDefined();
    });
});
