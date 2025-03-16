import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produtos.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    try {
      return await this.produtosService.create(createProdutoDto);
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao criar produto`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.produtosService.findAll();
    } catch (error) {
      throw new NotFoundException('Erro ao buscar todos os produtos');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.produtosService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    try {
      return await this.produtosService.update(+id, updateProdutoDto);
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao atualizar o produto com ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.produtosService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao remover o produto com ID ${id}`,
      );
    }
  }
}
