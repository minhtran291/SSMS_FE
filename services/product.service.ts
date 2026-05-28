import { API_BASE_URL } from '@/lib/api';
import type { ProductList, ProductDetail } from '@/types/product.type';
import { z } from 'zod';

const PRODUCT_PATH: string = 'Product';

const ProductListSchema = z.object({
    id: z.number(),
    productName: z.string(),
    categoryName: z.string(),
    brandName: z.string(),
    thumbnail: z.string(),
    price: z.number(),
    size: z.number(),
});

const SizePriceSchema = z.object({
    size: z.number(),
    price: z.number(),
});

const ProductDetailSchema = z.object({
    id: z.number(),
    productName: z.string(),
    description: z.string().optional(),
    categoryName: z.string(),
    brandName: z.string(),
    productImages: z.array(z.string()),
    productSizePrices: z.array(SizePriceSchema),
});

export async function getProducts(): Promise<ProductList[]> {
    const response = await fetch(`${API_BASE_URL}/Product`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const result = ProductListSchema.array().safeParse(data);

    if (!result.success) {
        throw new Error('Invalid product data format', result.error);
    }

    return result.data;
}

export async function getProductById(id: number): Promise<ProductDetail> {
    const response = await fetch(`${API_BASE_URL}/${PRODUCT_PATH}/${id}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const result = ProductDetailSchema.safeParse(data);

    if (!result.success) {
        throw new Error('Invalid product detail data format', result.error);
    }

    return result.data;
}