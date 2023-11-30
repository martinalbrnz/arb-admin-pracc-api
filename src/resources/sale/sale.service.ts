import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product, ProductDocument } from '@resources/product/schemas/product.schema'
import { Model } from 'mongoose'
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

    const newSale = new this.saleModel({ ...createSaleDto, articles })

    return newSale.save()
  }

  findAll() {
    return 'This action returns all sale'
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`
  }

  // update(id: number, updateSaleDto: UpdateSaleDto) {
  //   return `This action updates a #${id} sale`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sale`
  // }
}
