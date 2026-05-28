'use client';

import Image from 'next/image';

import { IMAGE_BASE_URL } from '@/lib/api';
import type { ProductDetail as ProductDetailType } from '@/types/product.type';

type Props = {
    product: ProductDetailType;
}

export default function ProductDetail({ product }: Props) {
    const lowestPrice = Math.min(...product.productSizePrices.map(x => x.price));

    return (
        <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg border">
                    <Image
                        unoptimized={process.env.NODE_ENV === 'development'}
                        src={`${IMAGE_BASE_URL}${product.productImages[0]}`}
                        alt={product.productName}
                        className="object-cover"
                        fill />
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {product.productImages.map(image => (
                        <div
                            key={image}
                            className="relative aspect-square overflow-hidden rounded border">
                            <Image
                                unoptimized={process.env.NODE_ENV === 'development'}
                                src={`${IMAGE_BASE_URL}${image}`}
                                alt={product.productName}
                                className="object-cover"
                                fill />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <p className="text-sm text-gray-500">
                        Thương hiệu: {product.brandName}
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        {product.productName}
                    </h1>

                    <p className="text-2xl">
                        Giá: {lowestPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>

                    <div>
                        <h2 className="mb-1 font-medium">
                            Các kích cỡ có sẵn:
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {product.productSizePrices.map(item => (
                                <button
                                    key={item.size}
                                    className="rounded-md border px-4 py-2 hover:bg-gray-100">
                                    {item.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-2 leading-7 text-gray-700">
                            {product.description || 'No description available.'}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}