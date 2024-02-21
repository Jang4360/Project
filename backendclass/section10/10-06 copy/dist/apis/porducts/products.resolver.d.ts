import { ProductsService } from "./products.service";
import { CreateProductInput } from "./dto/create-product.input";
import { Product } from "./entities/product.entity";
import { UpdateProductInput } from "./dto/update-product.input";
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    fetchProducts(): Promise<Product[]>;
    fetchProduct(productId: string): Promise<Product>;
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
    updateProduct(productId: string, updateProductInput: UpdateProductInput): Promise<Product>;
    deleteProduct(productId: string): Promise<boolean>;
}
