import { IMAGE_BASE_URL } from '@/lib/api';
import type { ProductList } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/format';

interface Props {
    product: ProductList;
}

export default function ProductCard({ product }: Props) {

    return (
        <Link href={`/products/${product.id}`}>
            <div className="border rounded-lg p-4">
                <div className='relative aspect-square'>
                    <Image
                        unoptimized={process.env.NODE_ENV === 'development'}
                        src={`${IMAGE_BASE_URL}${product.thumbnail}`}
                        alt={product.productName}
                        className="object-cover rounded"
                        fill
                    />
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-bold">
                        {product.productName}
                    </h2>

                    <p className="mt-2 font-semibold">
                        Thương hiệu: {product.brandName}
                    </p>

                    <p className="mt-2 font-semibold">
                        Thể loại: {product.categoryName}
                    </p>

                    <p className="mt-2 font-semibold">
                        Kích cỡ: {product.size}
                    </p>

                    <p className="mt-2 font-semibold">
                        Giá: {formatCurrency(product.price)}
                    </p>
                </div>
            </div>
        </Link>
    );
}