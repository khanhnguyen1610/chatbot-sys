import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: UserDto): Promise<UserDto> {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: UserDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: UserDto }): UserDto {
    console.log(req.user);

    return req.user;
  }
}
