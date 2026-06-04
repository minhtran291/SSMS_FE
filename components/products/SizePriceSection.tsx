import React from "react";
import { SizeOption, CreateProductSizePrice } from '@/types/product.type';

type Props = {
    sizes: SizeOption[];
    sizePrices: CreateProductSizePrice[];
    errors: Record<string, string[]>;
    onAddRow: () => void;
    onRemoveRow: (index: number) => void;
    onSizePriceChange: (index: number, field: 'sizeId' | 'price', value: number) => void;
};

export default function SizePriceSection({
    sizes,
    sizePrices,
    errors,
    onAddRow,
    onRemoveRow,
    onSizePriceChange
}: Props) {

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <label>
                    Kích thước và giá
                </label>

                <button
                    type="button"
                    onClick={onAddRow}
                    className="cursor-pointer rounded bg-blue-500 box text-white">
                    Thêm
                </button>
            </div>

            {/* {loi chung} */}
            {errors.SizePrices?.map(error => (
                <p
                    key={error}
                    className="text-sm text-red-500">
                    {error}
                </p>
            ))}

            {/* {loi tung size/gia dua tren chi muc, moi size/gia lai co 1 mang error nen phai map} */}
            {sizePrices.map((item, index) => {
                const sizeError =
                    errors[`SizePrices[${index}].Price`];

                return (
                    <div key={index}>
                        {sizeError?.map((error, idx) => (
                            <p
                                key={idx}
                                className="text-sm text-red-500">
                                {error}
                            </p>
                        ))}

                        <div className="mb-2 flex gap-2">
                            <select
                                value={item.sizeId}
                                onChange={(e) => onSizePriceChange(index, 'sizeId', Number(e.target.value))}
                                className="rounded border px-3 py-2">

                                {sizes.map(size => (
                                    <option
                                        key={size.id}
                                        value={size.id}>
                                        {size.value}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                value={item.price}
                                onChange={(e) => onSizePriceChange(index, 'price', Number(e.target.value))}
                                className="w-full rounded border px-3 py-2"
                            />

                            <button
                                type="button"
                                onClick={() => onRemoveRow(index)}
                                className="cursor-pointer rounded bg-red-500 p-1 text-white">
                                Xóa
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}