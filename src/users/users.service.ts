import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from './dto/get-users-params.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting Auth Service
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUserParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

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

  public findOneById(id: string) {
    return {
      id,
      firstName: 'Burhanudin',
      email: 'bani@bani.io',
    };
  }
}
