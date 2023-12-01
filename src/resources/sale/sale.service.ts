import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product, ProductDocument } from '@resources/product/schemas/product.schema'
import { Model } from 'mongoose'
import { PaginationQuery } from 'src/models/pagination-query.model'
import { CreateSaleDto } from './dto/create-sale.dto'
import { Sale } from './entities/sale.entity'
import { SaleDocument } from './schemas/sale.schema'

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(createSaleDto: CreateSaleDto) {
    const products = createSaleDto.articles.map(article => article.product)

    const productsQuery = await this.productModel
      .find().where('_id').in(products).select('price').lean()

    const articles = createSaleDto.articles.map(article => {
      const currentProduct = productsQuery
        .find(item => item._id.toString() === article.product.toString())
      return {
        ...article,
        unitCost: currentProduct.price,
        partialCost: currentProduct.price * article.quantity * (1 - article.discount)
      }
    })

    const totalCost = articles.reduce((acc, curr) => {
      return acc + curr.partialCost
    }, 0)

    const newSale = new this.saleModel({ ...createSaleDto, articles, totalCost })

    return newSale.save()
  }

  async find(query: PaginationQuery) {
    const { take = 10, page = 1 } = query
    if (!page || Number(page) < 1) throw new BadRequestException('Page should be greater or equal to 1')
    if (isNaN(Number(page))) throw new BadRequestException('Page should be a number')

    if (!take || Number(take) < 1) throw new BadRequestException('Take should be greater or equal to 1')
    if (isNaN(Number(take))) throw new BadRequestException('Take should be a number')

    const data = await this.saleModel
      .find()
      .skip(Number(take) * (Number(page) - 1))
      .limit(Number(take))
      .exec()

    const count = await this.saleModel.countDocuments().exec()
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
    return this.saleModel.findById(id).exec()
  }
}
