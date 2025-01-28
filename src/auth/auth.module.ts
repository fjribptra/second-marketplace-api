import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CurrentUserInterceptor } from './insterceptors/current-user.intercentor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }],
  controllers: [AuthController]
})
export class AuthModule {}
