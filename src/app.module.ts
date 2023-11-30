import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import configuration from './config/configuration'
import { ClientModule } from './resources/client/client.module'
import { ProductModule } from './resources/product/product.module'
import { SaleModule } from './resources/sale/sale.module'
import { UserModule } from './resources/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    JwtModule.register({ global: true }),
    UserModule,
    AuthModule,
    ProductModule,
    ClientModule,
    SaleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
