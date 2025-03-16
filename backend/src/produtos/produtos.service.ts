import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produtos.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    try {
      return await this.prisma.produto.create({
        data: createProdutoDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao criar produto`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.produto.findMany();
    } catch (error) {
      throw new NotFoundException('Erro ao buscar todos os produtos');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.produto.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    try {
      return await this.prisma.produto.update({
        where: { id },
        data: updateProdutoDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao atualizar o produto com ID ${id}`,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.produto.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao remover o produto com ID ${id}`,
      );
    }
  }
}
