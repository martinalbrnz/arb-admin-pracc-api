import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import configuration from './config/configuration'
import { AccountUserModule } from './resources/account-user/account-user.module'
import { AccountModule } from './resources/account/account.module'
import { CategoryModule } from './resources/category/category.module'
import { RegisterModule } from './resources/register/register.module'
import { UserModule } from './resources/user/user.module'
import { ProductModule } from './resources/product/product.module'
import { ClientModule } from './resources/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    JwtModule.register({ global: true }),
    UserModule,
    AuthModule,
    RegisterModule,
    AccountModule,
    AccountUserModule,
    CategoryModule,
    ProductModule,
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
