import { Debt } from '../debt/debt.entity';
import { Payment } from '../payment/payment.entity';
import { Sale } from '../sale/sale.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  customeId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customerName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customerEmail: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customerPhone: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customerAddress: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Debt, (debts) => debts.customer)
  debts: Array<Debt>;

  @OneToMany(() => Payment, (payments) => payments.customer)
  payments: Array<Payment>;

  @OneToMany(() => Sale, (sales) => sales.customer)
  sales: Array<Sale>;
}
