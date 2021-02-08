import { Module } from '@nestjs/common';
import { UserController } from "./users.contoller";
import { UsersService } from "./users.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UsersService]
})
export class UsersModule {}