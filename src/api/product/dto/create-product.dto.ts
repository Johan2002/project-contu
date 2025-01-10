import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @ApiProperty({ description: 'Precio costo de producto' })
  @IsNumber()
  @IsNotEmpty()
  productPriceCost: number;

  @ApiProperty({ description: 'Descripccion del producto' })
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @ApiProperty({ description: 'Cantidad del producto' })
  @IsNumber()
  @IsNotEmpty()
  productStock: number;
}
