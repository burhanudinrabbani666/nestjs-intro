import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting Users Service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    const user = this.userService.findOneById(1234);
    /**
     * Check User exist database
     * login
     * Token
     */

    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
