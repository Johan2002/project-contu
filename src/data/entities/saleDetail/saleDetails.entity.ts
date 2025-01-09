import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Sale } from '../sale/sale.entity';

@Entity()
export class saleDetail {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @Column({ type: 'int4', nullable: false })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Sale, (sales) => sales.saledetails)
  sales: Sale;

  @ManyToOne(() => Product, (products) => products.saledetail)
  products: Array<Product>;
}
