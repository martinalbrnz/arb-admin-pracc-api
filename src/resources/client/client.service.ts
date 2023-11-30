import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaginationQuery } from 'src/models/pagination-query.model'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { Client, ClientDocument } from './schemas/client.schema'

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>
  ) { }

  create(createClientDto: CreateClientDto) {
    const newClient = new this.clientModel(createClientDto)
    return newClient.save()
  }

  async find(query: PaginationQuery) {
    const { take = 10, page = 1 } = query
    const data = this.clientModel.find()
      .skip(Number(take) * (Number(page) - 1))
      .limit(Number(take))
      .exec()

    const count = await this.clientModel.countDocuments().exec()
    const pages = Math.ceil(count / take)

    return { data, pagination: { count, currentPage: page, pages } }
  }

  findOne(id: string) {
    return this.clientModel.findById(id).exec()
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto).exec()
  }

  remove(id: string) {
    return this.clientModel.findByIdAndUpdate(id, { isActive: false }).exec()
  }
}
