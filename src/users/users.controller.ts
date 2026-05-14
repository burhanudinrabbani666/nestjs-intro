import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('{/:id{/:optional}}')
  public getUsers(@Param('id') id: string, @Query() query: any) {
    console.log(params);
    console.log(query);
    return `You Send GET Request to /users endpoint with`;
  }

  @Post()
  public createUsers(@Body() body: any) {
    console.log(body);
    return 'You Sent a POST to users endpoint';
  }
}
