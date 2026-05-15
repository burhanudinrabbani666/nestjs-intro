import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Injecting Auth Services
     */
    private readonly authServices: AuthService,
  ) {}
}
