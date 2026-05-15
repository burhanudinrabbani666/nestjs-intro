import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { GetUserParamDto } from './dto/get-users-params.dto';
import { PatchUserDto } from './dto/patch-users.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(limit, page);
  }

  @Get(':id')
  public getUsersById(@Param() getUsersParamsDto: GetUserParamDto) {
    console.log(typeof getUsersParamsDto.id);

    return this.usersService.findOneById(getUsersParamsDto.id);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return createUserDto;
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
