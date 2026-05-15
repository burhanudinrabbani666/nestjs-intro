import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { createUserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  @Get('{/:id}')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(id);
    console.log(limit);
    console.log(page);
    return `You Send GET Request to /users endpoint with`;
  }

  @Post()
  public createUsers(@Body(new ValidationPipe()) createUserDto: createUserDto) {
    console.log(createUserDto);
    return 'You Sent a POST to users endpoint';
  }
}
