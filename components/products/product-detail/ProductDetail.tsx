import type { ProductDetail as ProductDetailType } from '@/types/product.type';
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

type Props = {
    product: ProductDetailType;
}

export default function ProductDetail({ product }: Props) {

    return (
        <div className="grid gap-10 md:grid-cols-2 px-4">
            <ProductGallery
                images={product.productImages}
                productName={product.productName} />

            <ProductInfo product={product} />
        </div>
    )
}