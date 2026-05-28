import { API_BASE_URL } from '@/lib/api';
import type { ProductList } from '@/types/product.type';
import { z } from 'zod';

const ProductListSchema = z.object({
    id: z.number(),
    productName: z.string(),
    categoryName: z.string(),
    brandName: z.string(),
    thumbnail: z.string(),
    price: z.number(),
    size: z.number(),
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