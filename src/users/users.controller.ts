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
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { PatchUserDto } from './dto/patch-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    /**
     * This is injection Depedency userService
     */
    private readonly usersService: UsersService,
  ) {}

  @Get('{/:id}')
  public getUsers(
    @Param() getUsersParamsDto: GetUsersParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    if (getUsersParamsDto.id) {
      return this.usersService.findOneById(getUsersParamsDto.id);
    }

    return this.usersService.findAll(getUsersParamsDto, limit, page);
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
