import { Injectable } from '@nestjs/common';
import { User } from './users.model.ts';
import { uniqid } from 'uniqid';

@Injectable()
export class UsersService {
  users: User[] = [];

  addUser(name: string, username: string, password: string, email: string) {
    const id = uniqid();
    const newUser = new User(id, name, username, password, email);
    this.users.push(newUser);
    return newUser;
  }
}
