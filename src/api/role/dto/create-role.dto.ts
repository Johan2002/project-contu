import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Nombre del rol' })
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @ApiProperty({ description: 'Descripcion del rol' })
  @IsString()
  @IsNotEmpty()
  roleDescription: string;

  @ApiProperty({ description: 'Estado del rol' })
  @IsBoolean()
  roleStatus: boolean;
}
