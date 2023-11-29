import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { UserService } from 'src/resources/user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) { }

	async login(username: string, pass: string) {
		const user = await this.usersService.findOneByMailOrUsername(username)

		if (!user) throw new UnauthorizedException('Incorrect user or password')

		if (!user.isActive) throw new UnauthorizedException('User is not active')

		const { password, ...data } = user.toObject()

		if (user && compareSync(pass, password)) {
			const payload = { _id: user._id }
			const optionsATO: JwtSignOptions = { secret: process.env.SECRET, expiresIn: '12h' }
			const optionsRTO: JwtSignOptions = { secret: process.env.SECRET, expiresIn: '24h' }

			return {
				data,
				ATO: await this.jwtService.signAsync(payload, optionsATO),
				RTO: await this.jwtService.signAsync({ ...payload, refresh: true }, optionsRTO),
			}
		}
		throw new UnauthorizedException('Incorrect user or password')
	}

	// TODO: Implement secure token refresh 
	async refresh() {

	}
}
