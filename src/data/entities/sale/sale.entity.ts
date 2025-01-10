import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { saleDetail } from '../saleDetail/saleDetails.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @Column({ type: 'numeric', nullable: false })
  saleTotal: number;

  @Column({ type: 'varchar', nullable: false })
  saleDate: string;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  customer: Customer;

  @OneToMany(() => saleDetail, (saledetails) => saledetails.sales)
  saledetails: saleDetail;
}
