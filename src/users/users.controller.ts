import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { GetUserParamDto } from './dto/get-users-params.dto';
import { PatchUserDto } from './dto/patch-users.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { Auth } from '../auth/decarators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';

@Controller('users')
@ApiTags('Users ')
export class UsersController {
    constructor(
        /**
         * This is injection Depedency userService
         */
        private readonly usersService: UsersService,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Fetcha list of register user on application',
    })
    @ApiResponse({
        status: 200,
        description: 'successfully fetch Users.',
    })
    @ApiResponse({
        status: 500,
        description: 'Failed fetch Users. Internal Server Error.',
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'The number of entry return query',
        example: 10,
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'The Position of the apge that you want in API',
        example: 1,
    })
    public getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    public getUsersById(@Param() getUsersParamsDto: GetUserParamDto) {
        console.log(typeof getUsersParamsDto.id);

        return this.usersService.findOneById(getUsersParamsDto.id);
    }

    @Post()
    @Auth(AuthType.None)
    @UseInterceptors(ClassSerializerInterceptor)
    public createUsers(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Post('create-many')
    public createManyUsers(@Body() createManyUserDto: CreateManyUsersDto) {
        return this.usersService.createManyUsers(createManyUserDto);
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return patchUserDto;
    }
}
