import { Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from './dto/get-users-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUserParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    console.log(getUserParamsDto);
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

  public findOneById(id: number) {
    return {
      id,
      firstName: 'Burhanudin',
      email: 'bani@bani.io',
    };
  }
}
