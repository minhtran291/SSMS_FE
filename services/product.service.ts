import { API_BASE_URL } from '@/lib/api';
import { ProductDTO } from '@/types/product.type';
import { z } from 'zod';

const ImageDTOSchema = z.object({
    imageUrl: z.string(),
});

const SizePriceDTOSchema = z.object({
    size: z.number(),
    price: z.number(),
});

const ProductDTOSchema = z.object({
    id: z.number(),
    productName: z.string(),
    description: z.string().optional(),
    categoryName: z.string(),
    brandName: z.string(),
    productImages: z.array(ImageDTOSchema),
    productSizePrices: z.array(SizePriceDTOSchema),
});

const ProductsArraySchema = z.array(ProductDTOSchema);

export async function getProducts(): Promise<ProductDTO[]> {
    const response = await fetch(`${API_BASE_URL}/Product`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    try {
        return ProductsArraySchema.parse(data);
    } catch (error) {
        throw new Error(`Invalid product data format: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}