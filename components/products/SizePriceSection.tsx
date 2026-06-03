import React from "react";
import { SizeOption, CreateProductSizePrice } from '@/types/product.type';

type Props = {
    sizes: SizeOption[];
    sizePrices: CreateProductSizePrice[];
    setSizePrices: React.Dispatch<React.SetStateAction<CreateProductSizePrice[]>>;
    errors: Record<string, string[]>;
};

export default function SizePriceSection({
    sizes,
    sizePrices,
    setSizePrices,
    errors
}: Props) {
    const handleAdd = () => {
        setSizePrices(prev => [
            ...prev,
            {
                sizeId: sizes[0]?.id ?? 0,
                price: 1000,
            }
        ]);
    };

    const handleSizeChange = (
        index: number,
        sizeId: number
    ) => {
        const newItems = [...sizePrices];
        newItems[index].sizeId = sizeId;
        setSizePrices(newItems);
    };

    const handlePriceChange = (
        index: number,
        price: number
    ) => {
        const newItems = [...sizePrices];
        newItems[index].price = price;
        setSizePrices(newItems);
    }

    const handleRemove = (index: number) => {
        setSizePrices(prev =>
            prev.filter((_, i) => i !== index)
        );
    };

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <label>
                    Kích thước và giá
                </label>

                <button
                    type="button"
                    onClick={handleAdd}
                    className="cursor-pointer rounded bg-blue-500 p-1 text-white">
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
                                onChange={(e) =>
                                    handleSizeChange(
                                        index,
                                        Number(e.target.value)
                                    )
                                }
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
                                onChange={(e) =>
                                    handlePriceChange(
                                        index,
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full rounded border px-3 py-2"
                            />

                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
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