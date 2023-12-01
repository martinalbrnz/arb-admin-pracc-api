import { BadRequestException, Injectable } from '@nestjs/common'
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
    const { take = 10, page = 1, search = '' } = query

    if (!page || Number(page) < 1) throw new BadRequestException('Page should be greater or equal to 1')
    if (isNaN(Number(page))) throw new BadRequestException('Page should be a number')

    if (!take || Number(take) < 1) throw new BadRequestException('Take should be greater or equal to 1')
    if (isNaN(Number(take))) throw new BadRequestException('Take should be a number')

    const data = await this.clientModel
      .find()
      .or([
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ])
      .skip(Number(take) * (Number(page) - 1))
      .limit(Number(take))

    const count = await this.clientModel
      .find()
      .or([
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ])
      .countDocuments()
      .exec()

    const pages = Math.ceil(count / take)

    return {
      data,
      error: false,
      pagination: {
        count,
        elementsPerPage: Number(take),
        currentPage: Number(page),
        pages
      }
    }
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
