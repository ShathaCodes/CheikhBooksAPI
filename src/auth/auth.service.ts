import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';
import { SignInResponseDto } from './dto/signin-response.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: CreateUserDto): Promise<User> {
    /* 
            Recherche le User
            1- Si existe throw error 
            2- Si non 
                générie 🧂 
                générie pwd 
                savi
        */
    const { password, email } = registerDto;
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      throw new BadRequestException('User existant !!');
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      registerDto.password = hashedPassword;
      const newUser = await this.userService.create(registerDto);
      delete newUser.password;
      return newUser;
    }
  }

  async signin(credentials: SignInDto): Promise<SignInResponseDto> {
    /* 
        1- si le   user existe ou pas 
        2- on vérifie le mot de passe 
        */
    const { email, password } = credentials;
    const user = await this.userService.findUserByEmail(email );
    if (!user) {
      throw new BadRequestException('Bad credentials !!');
    } else {
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (!isAuthenticated) {
        throw new BadRequestException('Bad credentials  !!');
      } else {
        const payload: PayloadDto = {
          email: user.email,
          role: user.role,
        };
        const jwt = this.jwtService.sign(payload);
        return {
          token: jwt,
        };
      }
    }
  }
}
