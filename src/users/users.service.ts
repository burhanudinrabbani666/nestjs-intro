import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-users.dto';

/** Class to Connect to users table and perform business logic */
@Injectable()
export class UsersService {
    /**
     * Exports AuthServices
     * Injecting Repository
     * */
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) throw new ConflictException('Email Already Exist');

        // Create A new User
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }

    /** The Method to get all users from database */
    public findAll(limit: number, page: number) {
        const isAuth = this.authService.isAuth();
        console.log(isAuth);
        console.log(limit);
        console.log(page);

        return [
            {
                firstName: 'burhanudin',
                email: 'bani@bani.io',
            },
            {
                firstName: 'Nico',
                email: 'nico@nico.io',
            },
            {
                firstName: 'Aziz',
                email: 'aziz@aziz.io',
            },
        ];
    }

    /** The Method to get one user by id from user from database */
    public findOneById(id: number) {
        return {
            id,
            firstName: 'Burhanudin',
            email: 'bani@bani.io',
        };
    }
}
