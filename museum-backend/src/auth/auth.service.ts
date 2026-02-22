import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await this.comparePasswords(password, user.password)) {
      return user;
    }

    return null;
  }

  login(user: User) {
    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '3d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async comparePasswords(
    plainText: string,
    hashed: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  async refreshTokens(refreshToken: string) {
    const isValid = await this.validateRefreshToken(refreshToken);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const newAccessToken = this.jwtService.sign({ userId: isValid.id });
    const newRefreshToken = this.generateNewRefreshToken(isValid.id);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async validateRefreshToken(token: string) {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(token);
    } catch {
      return null;
    }

    return this.usersService.findByUsername(payload.username);
  }

  private generateNewRefreshToken(userId: number) {
    return this.jwtService.sign({ userId });
  }
}
