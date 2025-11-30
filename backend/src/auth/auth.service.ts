import { Injectable, ConflictException, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { IUserResponse, ISignInResponse } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<IUserResponse> {
    const { fullName, email, password, confirmPassword } = signUpDto;

    // Check if passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return this.formatUserResponse(user);
  }

  async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
    const { email, password } = signInDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const payload = { email: user.email, sub: user._id.toString(), role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: this.formatUserResponse(user),
    };
  }

  async validateUser(email: string, password: string): Promise<IUserResponse | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.formatUserResponse(user);
    }
    return null;
  }

  private formatUserResponse(user: UserDocument): IUserResponse {
    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }

  // Demo users setup (optional)
  async createDemoUsers() {
    const demoUsers = [
      {
        fullName: 'Demo User',
        email: 'demo@tamato.com',
        password: await bcrypt.hash('demo123', 12),
        role: 'user'
      },
      {
        fullName: 'Admin User',
        email: 'admin@tamato.com',
        password: await bcrypt.hash('admin123', 12),
        role: 'admin'
      }
    ];

    for (const userData of demoUsers) {
      const existingUser = await this.userModel.findOne({ email: userData.email });
      if (!existingUser) {
        await this.userModel.create(userData);
      }
    }
  }
}