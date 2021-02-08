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

  findUser(id: string): [User, number] {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('Could not find user.');
    }
    const user = this.users[userIndex];
    return [user, userIndex];
  }

  getUser(id: string) {
    const user = this.findUser(id)[0];
    delete user.password;
    return user;
  }

  updateUser(id: string, name: string, username: string, email: string) {
    const [user, userIndex] = this.findUser(id);
    if (name) {
      user.name = name;
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    return user;
  }
}
