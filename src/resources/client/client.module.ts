import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClientController } from './client.controller'
import { ClientService } from './client.service'
import { Client } from './entities/client.entity'
import { ClientSchema } from './schemas/client.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema }
    ])
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule { }
