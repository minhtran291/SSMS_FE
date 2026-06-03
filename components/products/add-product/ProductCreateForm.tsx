'use client';

import React, { useState } from 'react';
import { ProductFormData } from '@/types/product.type';
import { createProduct } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/errors/api.error';
import toast from 'react-hot-toast';

type Props = {
    formData: ProductFormData;
}

export default function ProductCreateForm({ formData }: Props) {
    const router = useRouter();
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

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const allowTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});

        try {
            const productId = await createProduct({
                productName,
                description,
                categoryId,
                brandId,
                sizePrices,
                images: images.map((image, index) => ({
                    file: image.file,
                    displayOrder: index + 1,
                }))
            });

            toast.success("Thêm sản phẩm thành công");

            router.push(`/products/${productId}`);
        }
        catch (error) {
            if (
                error instanceof ApiError &&
                error.statusCode === 400
            ) {
                setErrors(error.errors ?? {});
                return;
            }

            if (error instanceof Error) {
                toast.error(error.message);
                return;
            }

            toast.error("Có lỗi xảy ra");
        }
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
            toast.error("Có file ảnh không hợp lệ. Vui lòng chọn file có định dạng .jpg, .jpeg, .png hoặc .webp");

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

    const imageErrors = [
        ...new Set(
            Object.entries(errors)
                .filter(([key]) => key.startsWith("Images"))
                .flatMap(([, messages]) => messages)
        )
    ];

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
                    className="w-full rounded-md border px-3 py-2 mb-2"
                />
                {errors.ProductName?.map(error => (
                    <p
                        key={error}
                        className="text-sm text-red-500">
                        {error}
                    </p>
                ))}
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
                    className="w-full rounded-md border px-3 py-2 cursor-pointer">
                    {formData.categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                {errors.CategoryId?.map(error => (
                    <p
                        key={error}
                        className="text-sm text-red-500">
                        {error}
                    </p>
                ))}
            </div>

            <div>
                <label htmlFor="" className="mb-2 block font-medium">
                    Thương hiệu
                </label>

                <select
                    value={brandId}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2 cursor-pointer">
                    {formData.brands.map(brand => (
                        <option
                            key={brand.id}
                            value={brand.id}>
                            {brand.brandName}
                        </option>
                    ))}
                </select>
                {
                    errors.BrandId?.map(error => (
                        <p
                            key={error}
                            className="text-sm text-red-500">
                            {error}
                        </p>
                    ))
                }
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

                {
                    errors.SizePrices?.map(error => (
                        <p
                            key={error}
                            className="text-sm text-red-500">
                            {error}
                        </p>
                    ))
                }

                {sizePrices.map((item, index) => {
                    const sizeError = errors[`SizePrices[${index}].Price`];

                    return (
                        <>
                            {sizeError?.map((error, index) => (
                                <p
                                    key={index}
                                    className="text-sm text-red-500">
                                    {error}
                                </p>
                            ))}

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
                                    className="border rounded px-3 py-2 w-full" />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSizePrices(prev =>
                                            prev.filter((_, i) => i !== index))}
                                    className="bg-red-500 rounded text-white p-1 cursor-pointer">
                                    Xóa
                                </button>
                            </div>
                        </>
                    )
                })}
            </div>

            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label className="font-medium">
                        Hình ảnh
                    </label>
                </div>

                {imageErrors.map((error, index) => (
                    <p
                        key={index}
                        className="text-sm text-red-500">
                        {error}
                    </p>
                ))}

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