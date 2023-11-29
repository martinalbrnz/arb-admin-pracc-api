import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization
    if (!token) throw new UnauthorizedException('Token not provided')

    const options: JwtVerifyOptions = { secret: process.env.SECRET }

    try {
      this.jwtService.verify(token, options)
    } catch (error) {
      throw new UnauthorizedException('Expired or invalid Token')
    }
    return true
  }
}
