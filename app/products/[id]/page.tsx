import ProductDetail from '@/components/products/ProductDetail';
import { getProductById } from '@/services/product.service';

type Props = {
    params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;

    const product = await getProductById(Number(id));

    return (
        <div className="container mx-auto px-4 py-10">
            <ProductDetail product={product} />
        </div>
    );
}