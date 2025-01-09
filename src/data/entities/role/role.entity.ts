import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  roleName: string;

  @Column({ type: 'varchar', nullable: false })
  roleDescription: string;

  @Column({ type: 'boolean' })
  roleStatus: boolean;

  @OneToMany(() => User, (user) => user.role, { nullable: true })
  user: Array<User>;

  @ManyToMany(() => Permission, (permission) => permission.role, {
    nullable: false,
  })
  @JoinTable({ name: 'permission_rol' })
  permission: Array<Permission>;
}
