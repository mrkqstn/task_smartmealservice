import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(page?: number, limit?: number) {
    const parsedPage = page ? Number(page) : undefined;
    const parsedLimit = limit ? Number(limit) : undefined;
    const pageNumber = parsedPage && parsedPage > 0 ? parsedPage : 1;
    const limitNumber = parsedLimit && parsedLimit > 0 ? parsedLimit : 50;
    const skip = (pageNumber - 1) * limitNumber;

    const [data, total] = await this.productsRepository.findAndCount({
      order: { createdAt: 'DESC', id: 'DESC' },
      skip,
      take: limitNumber,
    });

    return { data, total };
  }

  async create(createProductDto: CreateProductDto) {
    await this.ensureArticleUnique(createProductDto.article);
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (
      updateProductDto.article &&
      updateProductDto.article !== product.article
    ) {
      await this.ensureArticleUnique(updateProductDto.article, id);
    }

    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productsRepository.remove(product);
    return { deleted: true };
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  private async ensureArticleUnique(article: string, excludeId?: number) {
    const existing = await this.productsRepository.findOne({
      where: { article },
    });

    if (existing && existing.id !== excludeId) {
      throw new BadRequestException('Article must be unique');
    }
  }
}
