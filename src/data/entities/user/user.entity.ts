import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userEmail: string;

  @Column({ type: 'varchar', nullable: false })
  userPassword: string;

  @ManyToOne(() => Role, (role) => role.user, {
    nullable: false,
  })
  role: Role;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
