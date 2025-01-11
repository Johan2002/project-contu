import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/data/entities/customer/customer.entity';
import {
  ICreateCustomer,
  ICustomer,
  IUpdateCustomer,
} from 'src/data/interfaces/api/customer/customer.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  async create({ ...createCustomer }: ICreateCustomer): Promise<ICustomer> {
    const { customerId }: ICustomer = await this.customerRepository.save({
      ...createCustomer,
    });

    const customer: ICustomer = await this.customerRepository.findOne({
      where: { customerId },
    });

    return customer;
  }

  async findAll(): Promise<Array<ICustomer>> {
    return await this.customerRepository.find();
  }

  async findOne(customerId: string): Promise<ICustomer> {
    const costumer: ICustomer = await this.customerRepository.findOne({
      where: { customerId },
    });

    if (!costumer) {
      throw new BadRequestException('Customer not found.');
    }

    return costumer;
  }

  async update(
    customerId: string,
    updateCostumer: IUpdateCustomer,
  ): Promise<ICustomer> {
    const updateResult: UpdateResult = await this.customerRepository.update(
      customerId,
      { ...updateCostumer },
    );

    if (!updateResult.affected)
      throw new NotFoundException('company information could not be updated.');

    const customer: ICustomer = await this.customerRepository.findOne({
      where: { customerId },
    });

    return customer;
  }

  async remove(customerId: string): Promise<string> {
    const deleteResult: DeleteResult =
      await this.customerRepository.delete(customerId);

    if (!deleteResult.affected)
      throw new NotFoundException('Customer not fonud.');

    return customerId;
  }
}
