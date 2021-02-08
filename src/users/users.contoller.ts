import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<any> {
    const newUSer = {
      ...(await this.usersService.addUser(name, username, password, email)),
    };
    delete newUSer.password;
    return newUSer;
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }
}
