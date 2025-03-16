import { IsString, IsNotEmpty, IsPositive, IsInt, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsPositive({ message: 'O preço deve ser um número positivo' })
  preco: number;

  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(0, { message: 'A quantidade deve ser maior ou igual a zero' })
  quantidade: number;
}

export class UpdateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome?: string;

  @IsPositive({ message: 'O preço deve ser um número positivo' })
  preco?: number;

  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(0, { message: 'A quantidade deve ser maior ou igual a zero' })
  quantidade?: number;
}
