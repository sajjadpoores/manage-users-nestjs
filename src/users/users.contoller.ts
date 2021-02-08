import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
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
    return await this.usersService.addUser(name, username, password, email);
  }

  @Get()
  async getUsers(): Promise<any> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  patchUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('email') email: string,
  ) {
    return this.usersService.updateUser(id, name, username, email);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
