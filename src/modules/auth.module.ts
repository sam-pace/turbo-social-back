import { Module } from '@nestjs/common'
import { AuthService } from '@services/auth.service'
import { AuthResolver } from '@resolvers/auth.resolver'
import { PrismaModule } from './prisma.module'
import { UserService } from '@services/user.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [PrismaModule],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtService,
    ConfigService,
  ],
  exports: [AuthService],
})
export class authModule {}
