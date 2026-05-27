import ProductList from '@/components/products/ProductList';
import { getProducts } from '@/services/product.service';

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-8">
                Products
            </h1>

            <ProductList products={products} />

        </main>
    )
}