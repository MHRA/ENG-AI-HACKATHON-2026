import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Get a list of device products with optional pagination and sorting.
   */
  async getProducts(query: GetProductsQueryDto) {
    const result = await this.productRepository.getProducts({
      organisationId: query.organisationId
        ? Number(query.organisationId)
        : undefined,
      deviceId: query.deviceId ? Number(query.deviceId) : undefined,
      startPos: query.startPos ? Number(query.startPos) : undefined,
      noOfRows: query.noOfRows ? Number(query.noOfRows) : undefined,
      sortField: query.sortField,
      isAscending:
        query.isAscending != null ? query.isAscending === 'true' : undefined,
    });
    return result.recordset;
  }

  /**
   * Get a single product detail by its ID.
   */
  async getProductById(productId: number) {
    const result = await this.productRepository.getProductById(productId);

    if (!result.recordset || result.recordset.length === 0) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return result.recordset[0];
  }
}
