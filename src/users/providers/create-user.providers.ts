import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Repository } from 'typeorm';
import { HasingProviders } from '../../auth/providers/hasing.providers';

@Injectable()
export class CreateUserProviders {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject(forwardRef(() => HasingProviders))
        private readonly hasingProviders: HasingProviders,
    ) {}

    /** ----------------------------------------------------------- /
     * The Method to Create user to database                        /
     * 200: Success Creata User                                     /
     * 409: Email Already Exist                                     /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        let existingUser: User | null = null;

        existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (existingUser) throw new ConflictException('Email Already Used');

        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hasingProviders.hashPassword(
                createUserDto.password,
            ),
        });
        newUser = await this.usersRepository.save(newUser);

        return newUser;
    }
}
