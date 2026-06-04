import { getProductFormData } from '@/services/product.service'
import ProductCreateForm from '@/components/products/add-product/ProductCreateForm';

export default async function CreateProductPage() {
    const formData = await getProductFormData();

    return (
        <div className="mx-auto p-6 w-full">
            <h1 className="mb-6 text-3xl font-bold text-center">
                Thêm sản phẩm
            </h1>

            <ProductCreateForm formData={formData} />
        </div>
    )
}