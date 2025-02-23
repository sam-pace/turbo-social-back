import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { UserLogin } from '@dtos/user-login.input';
import { PrismaService } from './prisma/prisma.service';
import { LoginResponse } from '@dtos/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(password: string, username: string) {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password && user.username == username) {
      return user;
    }
    throw new UnauthorizedException('Check the fields');
  }

  async login(user: UserLogin): Promise<LoginResponse> {

    const userData = await this.validateUser(user.password, user.username)
    
    const existingToken = await this.prisma.refreshToken.findUnique({
      where: { userId: userData.id },
    });

    if (existingToken) {
      try {

        this.jwtService.verify(existingToken.token, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        });

        const accessToken = this.jwtService.sign(
          { sub: userData.id, username: userData.username },
          {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '10m',
          },
        );

        return {
          accessToken,
          refreshToken: existingToken.token,
          message: 'User already logged in',
        };
      } catch (error) {

        await this.prisma.refreshToken.delete({
          where: { userId: userData.id },
        });
      }
    }

    const payload = { sub: userData.id, username: userData.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '10m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });


    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userData.id,
      },
    });

    return {
      accessToken,
      refreshToken,
      message: 'Login successfully',
    };
  }

  async refreshToken(oldRefreshToken: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: oldRefreshToken },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Refresh expired or invalid');
    }

    const decoded = this.jwtService.verify(oldRefreshToken);

    const user = await this.prisma.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.prisma.refreshToken.delete({
      where: { token: oldRefreshToken },
    });

    return this.login(user);
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
    return { message: 'Logout successfully' };
  }
}
