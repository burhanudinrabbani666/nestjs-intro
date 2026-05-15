import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('{/:id}')
  public getUsers(@Param('id', ParseIntPipe) id: number | undefined) {
    console.log(id);
    return `You Send GET Request to /users endpoint with`;
  }

  @Post()
  public createUsers(
    @Body() body: any,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(body);
    console.log(headers);
    console.log(ip);
    return 'You Sent a POST to users endpoint';
  }
}
