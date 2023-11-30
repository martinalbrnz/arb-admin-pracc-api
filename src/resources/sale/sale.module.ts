import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
// import { Client, ClientSchema } from '@resources/client/schemas/client.schema'
import { Product, ProductSchema } from '@resources/product/schemas/product.schema'
import { Sale } from './entities/sale.entity'
import { SaleController } from './sale.controller'
import { SaleService } from './sale.service'
import { SaleSchema } from './schemas/sale.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sale.name, schema: SaleSchema },
      { name: Product.name, schema: ProductSchema },
      // { name: Client.name, schema: ClientSchema },
    ])
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule { }
