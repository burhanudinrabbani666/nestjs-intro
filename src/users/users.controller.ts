import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { PatchUserDto } from './dto/patch-users.dto';

@Controller('users')
export class UsersController {
  @Get('{/:id}')
  public getUsers(@Param() getUsersParamsDto: GetUsersParamsDto) {
    return getUsersParamsDto;
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
