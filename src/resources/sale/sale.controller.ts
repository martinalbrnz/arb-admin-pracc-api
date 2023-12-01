import { AuthGuard } from '@guards/auth/auth.guard'
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { PaginationQuery } from 'src/models/pagination-query.model'
import { CreateSaleDto } from './dto/create-sale.dto'
import { SaleService } from './sale.service'

@Controller('sale')
@UseGuards(AuthGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto)
  }

  @Get()
  find(@Query() query: PaginationQuery) {
    return this.saleService.find(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id)
  }
}
