import {
    ConflictException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import profileConfig from './config/profile.config';

import { AuthService } from '../auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersCreateManyProvider } from './provider/users-create-many.provider';
import { CreateManyUsersDto } from './dto/create-many-users.dto';

/** Class to Connect to users table and perform business logic */
@Injectable()
export class UsersService {
    /** ----------------------------------------------------------- /
     * Exports AuthServices                                         /
     * Injecting Repository                                         /
     * Injeting profileConfig                                       /
     * Injecting DataSource                                         /
      ------------------------------------------------------------ */
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>,
        @Inject(DataSource)
        private readonly dataSource: DataSource,
        private readonly usersCreateManyProvider: UsersCreateManyProvider,
    ) {}

    /** ----------------------------------------------------------- /
     * The Method to Create user to database                        /
     * 200: Success Creata User                                     /
     * 409: Email Already Exist                                     /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        let existingUser: User | null;
        try {
            existingUser = await this.usersRepository.findOne({
                where: { email: createUserDto.email },
            });
        } catch (error) {
            console.log(error);
            throw new RequestTimeoutException(
                'Unable to proccess at the moment please try later',
                { description: 'Error connecting to the database' },
            );
        }

        if (existingUser)
            throw new ConflictException(
                'The User already exists, please check your email',
            );

        let newUser = this.usersRepository.create(createUserDto);
        try {
            newUser = await this.usersRepository.save(newUser);

            return newUser;
        } catch (error) {
            console.log(error);
            throw new RequestTimeoutException(
                'Unable to proccess at the moment please try later',
                { description: 'Error connecting to the database' },
            );
        }
    }

    /** ----------------------------------------------------------- /
     * The Method to get all users from database                    /
     * 200: Success get Users                                       /
     * 500: Internal Server Error                                   /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    public findAll(limit?: number, page?: number) {
        return this.usersRepository.find();
    }

    /** ----------------------------------------------------------- /
     * The Method to get one user by id from user from database     /
     * 200: Success get User                                        /
     * 404: User Not Found                                          /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    public async findOneById(id: number): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });

            if (!user)
                throw new NotFoundException(
                    'User Not Found. Please Check Your User id',
                    { description: 'User with Id not found' },
                );

            return user;
        } catch (error) {
            console.error(error);
            throw new RequestTimeoutException(
                'Unable to proccess at the moment please try later',
                { description: 'Error connecting to the database' },
            );
        }
    }

    public async createManyUsers(createManyUserDto: CreateManyUsersDto) {
        return this.usersCreateManyProvider.createManyUser(createManyUserDto);
    }
}
