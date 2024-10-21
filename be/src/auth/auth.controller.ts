import { Controller, Get, Post, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/decorator/user.decorator';
import { Public } from 'src/decorator/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
	@UseGuards(AuthGuard("local"))
	@Public()
	@Post("login")
	async login(
		@User() user,
	) {
		return this.authService.login(user);
	}

	@Get("account")
	async account(@User() user) {
		return { user };
	}
}
