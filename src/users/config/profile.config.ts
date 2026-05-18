import { registerAs } from '@nestjs/config';

export default registerAs('porfileConfig', () => ({
    apiKey: process.env.PROFILE_API_KEY,
}));
