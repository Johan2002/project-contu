import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/data/entities/product/product.entity';
import {
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from 'src/data/interfaces/api/product/product.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async create({ ...createProduct }: ICreateProduct): Promise<IProduct> {
    const { productId }: IProduct = await this.productRepository.save({
      ...createProduct,
    });

    const product: IProduct = await this.productRepository.findOne({
      where: { productId },
    });

    return product;
  }

  async findAll(): Promise<Array<IProduct>> {
    return await this.productRepository.find();
  }

  async findOne(productId: string): Promise<IProduct> {
    const product: IProduct = await this.productRepository.findOne({
      where: { productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async update(
    productId: string,
    updateProduct: IUpdateProduct,
  ): Promise<IProduct> {
    const updateResult: UpdateResult = await this.productRepository.update(
      productId,
      { ...updateProduct },
    );

    if (!updateResult.affected)
      throw new NotFoundException('Product information could not be updated.');

    const product: IProduct = await this.productRepository.findOne({
      where: { productId },
    });

    return product;
  }

  async remove(productId: string) {
    const deleteResult: DeleteResult =
      await this.productRepository.delete(productId);

    if (!deleteResult.affected)
      throw new NotFoundException('Product not found.');

    return productId;
  }
}
