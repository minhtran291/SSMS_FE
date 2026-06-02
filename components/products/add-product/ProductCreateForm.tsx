'use client';

import React, { useState } from 'react';
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
        file: File;
        preview: string;
    }[]>([])

    const allowTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

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
                (index + 1).toString()
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

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);

        // e.target.files tra ve 1 FileList hoac null
        // phai chuyen thanh array de su dung cac method cua array

        const invalidFiles = files.filter(
            file => !allowTypes.includes(file.type)
        );

        // filter kiem tra tung object trong mang theo dk
        // dung thi lay ko thi bo qua
        // mang .includes de kiem tra xem 1 value co trong mang hay ko

        if (invalidFiles.length > 0) {
            alert("Có file ảnh không hợp lệ. Vui lòng chọn file có định dạng .jpg, .jpeg, .png hoặc .webp");

            e.target.value = "";
            return;
        }

        setImages(prev => [
            ...prev,
            ...files.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }))
        ]);

        // lay toan bo object truoc dai vao mang
        // lay toan bo object trong fil dai vao mang
        // map di qua tung object trong file va tra ve 1 object moi
        // thong thuong dung {} thi phai return, vi {} la than ham
        // dung ({}) de return nhanh 1 object luon

        e.target.value = "";
        // reset lai gia tri cua file nhap vao
        // neu ko reset thi bi kieu chon 1 file roi xoa
        // roi chon lai file do thi onChange se k dc kich hoat
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
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
                    <label>
                        Kích thước và giá
                    </label>

                    <button
                        type="button"
                        onClick={() =>
                            setSizePrices(prev => [...prev, {
                                sizeId: formData.sizes[0]?.id ?? 0,
                                price: 1000,
                            }])}
                        className="cursor-pointer bg-blue-500 text-white rounded p-1">
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
                                    prev.filter((_, i) => i !== index))}
                            className="bg-red-500 rounded text-white p-1">
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
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-square overflow-hidden rounded border">
                            <img
                                src={image.preview}
                                alt=""
                                className="h-full w-full object-cover" />

                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute right-2 top-2 h-6 w-6 rounded-full bg-red-500 text-white cursor-pointer">
                                &times;
                            </button>

                            <div className="absolute left-2 bottom-2 rounded bg-black/60
                                px-2 py-1 text-xs text-white">
                                #{index + 1}
                            </div>
                        </div>
                    ))}

                    <label htmlFor="image-upload" className="flex aspect-square cursor-pointer items-center rounded
                        border-2 border-dashed border-gray-300 text-gray-500 justify-center">
                        <input
                            id="image-upload"
                            type="file"
                            multiple
                            hidden
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleAddImage} />

                        <div className="text-center">
                            <div className="text-2xl">
                                +
                            </div>

                            <div>
                                Thêm hình ảnh
                            </div>
                        </div>
                    </label>
                </div>

            </div>

            <button
                type="submit"
                className="rounded-md bg-black px-6 py-3 text-white transition hover:bg-gray-800 cursor-pointer">
                Thêm sản phẩm
            </button>
        </form>
    )
}