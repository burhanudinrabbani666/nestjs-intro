import { faker } from '@faker-js/faker';
import { User } from '../../src/users/users.entity';

export const completeUser: Partial<User> = {
    firstName: faker.person.firstName('male'),
    lastName: faker.person.lastName('male'),
    email: faker.internet.email(),
    password: 'password1234#',
};

export const missingFirstName: Partial<User> = {
    lastName: faker.person.lastName('male'),
    email: faker.internet.email(),
    password: 'password1234#',
};

export const missingEmail: Partial<User> = {
    firstName: faker.person.firstName('male'),
    lastName: faker.person.lastName('male'),
    password: 'password1234#',
};

export const missingPassword: Partial<User> = {
    firstName: faker.person.firstName('male'),
    lastName: faker.person.lastName('male'),
    email: faker.internet.email(),
};
