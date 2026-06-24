import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ProductService } from './product.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@ApiTags('Products')
@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get products',
    description:
      'Retrieves a list of device products with optional pagination and sorting.',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async getProducts(@Query() query: GetProductsQueryDto) {
    return this.productService.getProducts(query);
  }

  @Get(':productId')
  @ApiOperation({
    summary: 'Get a single product by ID',
    description: 'Retrieves a single product detail by its unique identifier.',
  })
  @ApiParam({ name: 'productId', type: Number, description: 'The product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid API key' })
  async getProductById(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.getProductById(productId);
  }
}
