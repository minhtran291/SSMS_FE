import { getProductFormData } from '@/services/product.service'
import ProductCreateForm from '@/components/products/add-product/ProductCreateForm';

export default async function CreateProductPage() {
    const formData = await getProductFormData();

    return (
        <div className="mx-auto max-w-3xl p-6 w-md">
            <h1 className="mb-6 text-3xl font-bold">
                Thêm sản phẩm
            </h1>

            <ProductCreateForm formData={formData} />
        </div>
    )
}