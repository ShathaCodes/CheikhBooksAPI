import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { editFileName } from 'src/generics/files/edit-file-name';
import { imageFileFilter } from 'src/generics/files/image-file-filter';
import { User } from 'src/users/entities/user.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }


  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/books',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10000
      }
    }),
  )
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUser() user: User, @UploadedFile() file: Express.Multer.File, @Body() createBookDto: CreateBookDto) {
    createBookDto.image = file.filename;
    createBookDto.user = user;
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Query() query ) {
    return this.booksService.findAllSearch(query["genre"]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id, { relations: ["genres", "reviews", "ratings"] });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@GetUser() user: User, @Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.booksService.findOne(+id, { "relations": ["user"] })
    if (book.user.id === user.id)
      return this.booksService.update(+id, updateBookDto);
    else throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@GetUser() user: User, @Param('id') id: string) {
    const book = await this.booksService.findOne(+id, { "relations": ["user"] })
    if (book.user.id === user.id)
      return this.booksService.remove(+id);
    else throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
