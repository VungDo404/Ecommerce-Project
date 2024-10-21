import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAccessTokenAuthGuard } from './guard/jwt.guard';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://vungdo404:AQ8eSRy0wVLjKYoD@cluster0.tnwlg.mongodb.net/master?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenAuthGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class AppModule {}
