import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInUserDto } from './dto/sign-in-user.dto'

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
	) { }

	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() signInDto: SignInUserDto) {
		return this.authService.login(signInDto.username, signInDto.password)
	}
}
