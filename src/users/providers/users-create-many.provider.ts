import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../users.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateManyUsersDto } from '../dto/create-many-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HasingProviders } from '../../auth/providers/hasing.providers';

@Injectable()
export class UsersCreateManyProvider {
    constructor(
        @Inject(DataSource)
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject(forwardRef(() => HasingProviders))
        private readonly hasingProviders: HasingProviders,
    ) {}

    /** ------------------------------------------------------  /
     *  Check If email already exist, filtering in memory       /
     *  Using trasactions                                       /
     --------------------------------------------------------- */
    public async createManyUser(createManyUsersDto: CreateManyUsersDto) {
        const newUsers: User[] = [];
        const emails = createManyUsersDto.users.map((user) => user.email);

        const existingEmail = await this.usersRepository.find({
            where: { email: In(emails) },
            select: ['email'],
        });

        if (existingEmail.length > 0) {
            const duplicates = existingEmail.map((u) => u.email).join(', ');
            throw new ConflictException(`Emails already exist: ${duplicates}`);
        }

        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const users = createManyUsersDto.users;
            for (const user of users) {
                const newUser = queryRunner.manager.create(User, user);
                newUser.password = await this.hasingProviders.hashPassword(
                    newUser.password,
                );

                const result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            console.log(error);

            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(
                'Could Not complete the trasaction',
                { description: String(error) },
            );
        } finally {
            try {
                await queryRunner.release();
            } catch (error) {
                console.log(error);
            }
        }

        return newUsers;
    }
}
