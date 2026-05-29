'use client';

import { useState } from 'react';
import type { ProductDetail as ProductDetailType } from '@/types/product.type';
import { formatCurrency } from '@/lib/format';

type Props = {
    product: ProductDetailType;
}

export default function ProductInfo({ product }: Props) {

    // state quan ly size dang chon
    const [selectedSize, setSelectedSize] = useState(
        product.productSizePrices[0]
    );

    return (
        <div className="space-y-1">
            <div>
                <p className="text-sm text-gray-500">
                    Thương hiệu: {product.brandName}
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                    {product.productName}
                </h1>

                <p className="text-2xl">
                    Giá: {formatCurrency(selectedSize.price)}
                </p>
            </div>

            <div>
                <h2 className="mb-1 font-medium">
                    Các kích cỡ có sẵn:
                </h2>

                <div className="flex flex-wrap gap-2">
                    {product.productSizePrices.map(item => {
                        const isSelected = item.size === selectedSize.size;

                        return (
                            <button
                                key={item.size}
                                onClick={() => setSelectedSize(item)}
                                className={`rounded-md border px-4 py-2 transition cursor-pointer
                                    ${isSelected
                                        ? 'border-black bg-black text-white'
                                        : 'hover:bg-gray-100'}`}>
                                {item.size}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div>
                <h2 className="mb-2 leading-7 text-gray-700">
                    {product.description || 'No description available.'}
                </h2>
            </div>
        </div>
    );
}