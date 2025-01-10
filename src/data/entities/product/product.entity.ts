import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { saleDetail } from '../saleDetail/saleDetails.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'varchar', nullable: false })
  productName: string;

  @Column({ type: 'numeric', nullable: false })
  productPrice: number;

  @Column({ type: 'numeric', nullable: false })
  productPriceCost: number;

  @Column({ type: 'varchar', nullable: true })
  productDescription: string;

  @Column({ type: 'int', nullable: false })
  productStock: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => saleDetail, (saledetail) => saledetail.products)
  saledetail: saleDetail;
}
