import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { IUserResponse, ISignInResponse } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<IUserResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<ISignInResponse> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Initialize demo users (call this once)
  @Post('setup-demo-users')
  async setupDemoUsers() {
    await this.authService.createDemoUsers();
    return { message: 'Demo users created successfully' };
  }
}