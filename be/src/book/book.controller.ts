import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Public()
  @Get("category")
	getCategory() {
		return this.bookService.category();
	}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }
}
