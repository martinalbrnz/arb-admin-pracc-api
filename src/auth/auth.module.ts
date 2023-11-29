import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/resources/user/schemas/user.schema'
import { UserModule } from 'src/resources/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    JwtModule.register({ secret: process.env.SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
