import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  debtId: string;

  @Column({ type: 'numeric', nullable: true })
  totalAmount: number;

  @Column({ type: 'numeric', nullable: true })
  amountPaid: number;

  @Column({ type: 'varchar', default: 'pending' })
  state: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.debts)
  customer: Customer;
}
