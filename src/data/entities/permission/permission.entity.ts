import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  permissionId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  permissionName: string;

  @ManyToMany(() => Role, (role) => role.permission, { nullable: false })
  role: Array<Role>;
}
