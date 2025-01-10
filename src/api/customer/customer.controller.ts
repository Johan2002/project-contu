import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCostumerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':customerId')
  findOne(@Param('customerId') customerId: string) {
    return this.customerService.findOne(customerId);
  }

  @Put(':customerId')
  update(
    @Param('customerId') customerId: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return this.customerService.update(customerId, updateCostumerDto);
  }

  @Delete(':customerId')
  remove(@Param('customerId') customerId: string) {
    return this.customerService.remove(customerId);
  }
}
