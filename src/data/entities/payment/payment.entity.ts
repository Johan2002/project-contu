import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentsId: string;

  @Column({ type: 'numeric', nullable: false })
  paymentValue: number;

  @Column({ type: 'timestamp', nullable: true })
  paymentDate: Date;

  @Column({ type: 'numeric', nullable: false })
  paymentConcept: number;

  @Column({ type: 'varchar' })
  paymentMethod: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.payments)
  customer: Customer;
}
