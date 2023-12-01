import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaginationQuery } from 'src/models/pagination-query.model'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product, ProductDocument } from './schemas/product.schema'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) { }

  create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto)
    return newProduct.save()
  }

  async find(query: PaginationQuery) {
    const { take = 10, page = 1, search = '' } = query
    if (!page || Number(page) < 1) throw new BadRequestException('Page should be greater or equal to 1')
    if (isNaN(Number(page))) throw new BadRequestException('Page should be a number')

    if (!take || Number(take) < 1) throw new BadRequestException('Take should be greater or equal to 1')
    if (isNaN(Number(take))) throw new BadRequestException('Take should be a number')

    const data = await this.productModel
      .find()
      .or([
        { name: { $regex: search, $options: 'i' } },
      ])
      .skip(Number(take) * (Number(page) - 1))
      .limit(Number(take))
      .exec()

    const count = await this.productModel.countDocuments().exec()
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
    return this.productModel.findById(id).exec()
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto).exec()
  }

  remove(id: string) {
    return this.productModel.findByIdAndUpdate(id, { isActive: false }).exec()
  }
}
