import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './users.model.ts';
import * as uniqid from 'uniqid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  users: User[] = [];

  async addUser(
    name: string,
    username: string,
    password: string,
    email: string,
  ) {
    const foundUser = this.users.find(
      (user) => user.email === email || user.username === username,
    );
    if (foundUser) {
      throw new ConflictException('User already exist');
    }
    const id = uniqid();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User(id, name, username, hash, email);
    this.users.push(newUser);
    return newUser;
  }

  getUsers() {
    const users = [...this.users];
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  getUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    delete user.password;
    return user;
  }
}
