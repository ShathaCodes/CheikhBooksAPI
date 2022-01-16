import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/generics/files/edit-file-name';
import { imageFileFilter } from 'src/generics/files/image-file-filter';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('register')
  register(@UploadedFile() file: Express.Multer.File,
    @Body() registerDto: CreateUserDto) {
    console.log('file :', file);
    registerDto.score = {}
    registerDto.avatar = file.filename;
    return this.authService.register(registerDto);
  }
  @Post('login')
  signIn(@Body() credentials: SignInDto) {
    return this.authService.signin(credentials);
  }
}
