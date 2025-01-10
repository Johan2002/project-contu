import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Usuario' })
  @IsString()
  userName: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(5)
  userPassword: string;
}
