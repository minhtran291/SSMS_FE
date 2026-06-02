'use client';

import { useState } from 'react';
import { ProductFormData } from '@/types/product.type';
import { API_BASE_URL } from '@/lib/api';

type Props = {
    formData: ProductFormData;
}

export default function ProductCreateForm({ formData }: Props) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');

    const [categoryId, setCategoryId] = useState(formData.categories[0]?.id ?? 0);

    const [brandId, setBrandId] = useState(formData.brands[0]?.id ?? 0);

    const [sizePrices, setSizePrices] = useState([
        {
            sizeId: formData.sizes[0]?.id ?? 0,
            price: 1000,
        }
    ]);

    const [images, setImages] = useState<{
        file: File | null;
        displayOrder: number;
    }[]>([
        {
            file: null,
            displayOrder: 0,
        }
    ])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();

        data.append("ProductName", productName);
        data.append("Description", description);

        data.append(
            "CategoryId",
            categoryId.toString()
        );

        data.append(
            "BrandId",
            brandId.toString()
        );

        sizePrices.forEach((item, index) => {
            data.append(
                `SizePrices[${index}].SizeId`,
                item.sizeId.toString()
            );

            data.append(
                `SizePrices[${index}].Price`,
                item.price.toString()
            );
        });

        images.forEach((item, index) => {
            if (!item.file)
                return;

            data.append(
                `Images[${index}].Image`,
                item.file
            );

            data.append(
                `Images[${index}].DisplayOrder`,
                item.displayOrder.toString()
            );
        });

        const response = await fetch(
            `${API_BASE_URL}/Product`,
            {
                method: "POST",
                body: data
            }
        );

        if (!response.ok) {
            console.log(await response.json());
            return;
        }

        alert("Thêm sản phẩm thành công");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6">
            <div>
                <label htmlFor="" className="mb-2 block font-medium">
                    Tên sản phẩm
                </label>

                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label htmlFor="" className="mb-2 block font-medium">
                    Mô tả
                </label>

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label htmlFor="" className="mb-2 block font-medium">
                    Danh mục
                </label>

                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2">
                    {formData.categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="" className="mb-2 block font-medium">
                    Thương hiệu
                </label>

                <select
                    value={brandId}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2">
                    {formData.brands.map(brand => (
                        <option
                            key={brand.id}
                            value={brand.id}>
                            {brand.brandName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="" className="font-medium">
                        Kích thước và giá
                    </label>

                    <button
                        type="button"
                        onClick={() =>
                            setSizePrices(prev => [...prev, {
                                sizeId: formData.sizes[0]?.id ?? 0,
                                price: 1000,
                            }])}>
                        Thêm
                    </button>
                </div>

                {sizePrices.map((item, index) => (
                    <div
                        key={index}
                        className="mb-2 flex gap-2">
                        <select
                            value={item.sizeId}
                            onChange={(e) => {
                                const newItems = [...sizePrices];
                                newItems[index].sizeId = Number(e.target.value);
                                setSizePrices(newItems);
                            }}
                            className="border rounded px-3 py-2">

                            {formData.sizes.map(size => (
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
                            onChange={(e) => {
                                const newItems = [...sizePrices];
                                newItems[index].price = Number(e.target.value);
                                setSizePrices(newItems);
                            }}
                            className="border rounded px-3 py-2" />

                        <button
                            type="button"
                            onClick={() =>
                                setSizePrices(prev =>
                                    prev.filter((_, i) => i !== index))}>
                            Xóa
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label className="font-medium">
                        Hình ảnh
                    </label>

                    <button
                        type="button"
                        onClick={() =>
                            setImages(prev => [
                                ...prev,
                                {
                                    file: null,
                                    displayOrder: prev.length
                                }
                            ])
                        }>
                        Thêm
                    </button>
                </div>

                {images.map((image, index) => (
                    <div
                        key={index}
                        className="mb-2 flex gap-2">

                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;

                                const newImages = [...images];
                                newImages[index].file = file;
                                setImages(newImages);
                            }}
                        />

                        <input
                            type="number"
                            value={image.displayOrder}
                            onChange={(e) => {
                                const newImages = [...images];
                                newImages[index].displayOrder =
                                    Number(e.target.value);

                                setImages(newImages);
                            }}
                            className="border rounded px-3 py-2"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setImages(prev =>
                                    prev.filter((_, i) => i !== index)
                                )
                            }>
                            Xóa
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="rounded-md bg-black px-6 py-3 text-white transition hover:bg-gray-800 cursor-pointer">
                Thêm sản phẩm
            </button>
        </form>
    )
}