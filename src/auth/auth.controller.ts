import { Body, Controller, Get, Post, Session, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/dtos/login-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './insterceptors/current-user.intercentor';
import { User } from 'src/users/user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(
      body.name,
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.authService.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/logout')
  logout(@Session() session: any) {
    session.userId = null;
    return 'Logged out';
  }
}
