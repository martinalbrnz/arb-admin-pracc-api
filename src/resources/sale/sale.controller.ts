import { AuthGuard } from '@guards/auth/auth.guard'
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
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
  findAll() {
    return this.saleService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
  //   return this.saleService.update(+id, updateSaleDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.saleService.remove(+id)
  // }
}
