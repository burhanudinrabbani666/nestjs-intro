import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting UserService
     */
    private readonly usersService: UsersService,
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    return [
      {
        user,
        title: 'Test Title1',
        content: 'content1',
      },
      {
        user,
        title: 'Test Title2',
        content: 'content2',
      },
    ];
  }
}
