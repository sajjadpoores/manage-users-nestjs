import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ): any {
    const newUSer = {
      ...this.usersService.addUser(name, username, password, email),
    };
    delete newUSer.password;
    return newUSer;
  }
}
