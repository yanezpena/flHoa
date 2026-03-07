import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  providers: [AuthService, GoogleStrategy, FacebookStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
