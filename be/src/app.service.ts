import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from './user/user.service';
import { BookService } from './book/book.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}
  async onModuleInit(): Promise<void> {
    await this.userService.seeding();
    await this.bookService.seeding();
  }
  getHello(): string {
    return 'Hello World!';
  }
}
