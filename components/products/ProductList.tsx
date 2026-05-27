import { ProductDTO } from '@/types/product.type';
import ProductCard from './ProductCard';

interface Props {
    products: ProductDTO[];
}

export default function ProductList({ products }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    )
}