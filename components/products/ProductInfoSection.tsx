import { CategoryOption, BrandOption } from '@/types/product.type';

type Props = {
    productName: string;
    description: string;
    categoryId: number,
    brandId: number,
    categories: CategoryOption[],
    brands: BrandOption[],
    errors: Record<string, string[]>;
    onProductNameChange: (name: string) => void;
    onDescriptionChange: (description: string) => void;
    onCategoryChange: (categoryId: number) => void;
    onBrandChange: (brandId: number) => void;
}

export default function ProductInfoSection({
    productName,
    description,
    categoryId,
    brandId,
    categories,
    brands,
    errors,
    onProductNameChange,
    onDescriptionChange,
    onCategoryChange,
    onBrandChange
}: Props) {

    return (
        <>
            <div>
                <label htmlFor="" className="mb-2 block font-medium">
                    Tên sản phẩm
                </label>

                <input
                    type="text"
                    value={productName}
                    onChange={(e) => onProductNameChange(e.target.value)}
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
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label htmlFor="" className="mb-2 block font-medium">
                    Danh mục
                </label>

                <select
                    value={categoryId}
                    onChange={(e) => onCategoryChange(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2 cursor-pointer">
                    {categories.map(category => (
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
                    onChange={(e) => onBrandChange(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2 cursor-pointer">
                    {brands.map(brand => (
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
        </>
    )
}