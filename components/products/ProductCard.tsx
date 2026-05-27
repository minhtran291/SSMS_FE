import { IMAGE_BASE_URL } from '@/lib/api';
import type { ProductDTO } from '@/types/product.type';
import Image from 'next/image';

interface Props {
    product: ProductDTO;
}

export default function ProductCard({ product }: Props) {
    const firstImage = product.productImages[0];

    return (
        <div className="border rounded-lg p-4">

            <div className='relative aspect-square'>
                <Image
                    unoptimized={process.env.NODE_ENV === 'development'}
                    src={`${IMAGE_BASE_URL}${firstImage.imageUrl}`}
                    alt={product.productName}
                    className="object-cover rounded"
                    fill
                />
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-bold">
                    {product.productName}
                </h2>

                <p className="text-gray-500">
                    {product.brandName}
                </p>

                <p className="text-gray-500">
                    {product.categoryName}
                </p>

                <p className="mt-2">
                    {product.description ?? "No description available."}
                </p>

                {
                    product.productSizePrices.length > 0 && (
                        <p className="mt-2 font-semibold">
                            {product.productSizePrices.map((sizePrice, index) => (
                                <span key={`size-${index}-${sizePrice.size}`}>
                                    {sizePrice.size}cm: {sizePrice.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    <br />
                                </span>
                            ))}
                        </p>
                    )
                }
            </div>
        </div>
    );
}