'use client';

import React, { useState } from 'react';
import { ProductFormData } from '@/types/product.type';
import { createProduct } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/errors/api.error';
import toast from 'react-hot-toast';
import SizePriceSection from '../SizePriceSection';
import ProductImageSection from '../ProductImageSection';

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const allowTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setErrors({});

        setIsSubmitting(true);

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

            images.forEach(image => {
                URL.revokeObjectURL(image.preview);
            });

            // xoa toan bo anh preview trong memory de tranh leak

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

            if (error instanceof ApiError) {
                toast.error(error.message);
                return;
            }

            if (error instanceof Error) {
                toast.error("Có lỗi xảy ra");
                console.log(error.message);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }

    const handleAddImage = (files: FileList) => {

        const fileArray = Array.from(files);
        // phai chuyen FileList thanh array de su dung cac method cua array

        const invalidFiles = fileArray.filter(
            file => !allowTypes.includes(file.type)
        );

        // filter kiem tra tung object trong mang theo dk
        // dung thi lay ko thi bo qua
        // mang .includes de kiem tra xem 1 value co trong mang hay ko

        if (invalidFiles.length > 0) {
            toast.error("Có file ảnh không hợp lệ. Vui lòng chọn file có định dạng .jpg, .jpeg, .png hoặc .webp");
            return;
        }

        // doan if nay ko can lo e.target.value = ""; nua vi
        // vi chay vao if nay se return luon
        // va o trong component con o input nhan ham da co 1 arrow function
        // ma moi lan goi ham nay dc truyen vao deu set e.target.value = ""
        // o cuoi nen ko can lo truong hop file ko hop le
        // ko set lai e.target.value = "" roi ko chon dc file

        setImages(prev => [
            ...prev,
            ...fileArray.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }))
        ]);

        // lay toan bo object truoc dai vao mang
        // lay toan bo object trong fil dai vao mang
        // map di qua tung object trong file va tra ve 1 object moi
        // thong thuong dung {} thi phai return, vi {} la than ham
        // dung ({}) de return nhanh 1 object luon

        //e.target.value = "";
        // reset lai gia tri cua file nhap vao
        // neu ko reset thi bi kieu chon 1 file roi xoa
        // roi chon lai file do thi onChange se k dc kich hoat
    };

    const handleRemoveImage = (index: number) => {
        URL.revokeObjectURL(images[index].preview);
        // xoa preview khi anh bi xoa, ko luu vao memory nua tranh leak

        setImages(prev => prev.filter((_, i) => i !== index));
    }

    const imageErrors = [
        ...new Set(
            Object.entries(errors)
                .filter(([key]) => key.startsWith("Images"))
                .flatMap(([, messages]) => messages)
        )
    ];

    // them 1 size/price moi
    const handleAddSizePrice = () => {
        setSizePrices(prev => [
            ...prev,
            {
                sizeId: formData.sizes[0]?.id ?? 0,
                price: 1000
            }
        ]);
    };

    const handleRemoveSizePrice = (index: number) => {
        setSizePrices(prev =>
            prev.filter((_, i) => i !== index)
        );
    };

    const handleSizePriceChange = (
        index: number,
        field: 'sizeId' | 'price',
        value: number
    ) => {
        setSizePrices(prev =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [field]: value
                    }
                    : item
            )
        );
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="">
            <div className="mx-auto w-md md:grid gap-6 md:grid-cols-2 md:w-4xl">
                <div className="space-y-4 p-4">
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
                </div>

                <div className="space-y-4 p-4">
                    <SizePriceSection
                        sizes={formData.sizes}
                        sizePrices={sizePrices}
                        errors={errors}
                        onAddRow={handleAddSizePrice}
                        onRemoveRow={handleRemoveSizePrice}
                        onSizePriceChange={handleSizePriceChange}
                    />

                    <ProductImageSection
                        images={images}
                        imageErrors={imageErrors}
                        onAddImage={handleAddImage}
                        onRemoveImage={handleRemoveImage}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="block mx-auto rounded-md bg-black px-6 py-3 text-white
                transition duration-300 hover:scale-110 cursor-pointer disabled:opacity-50
                disabled:pointer-none">
                Thêm sản phẩm
            </button>
        </form>
    )
}