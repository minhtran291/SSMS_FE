export interface ProductList {
    id: number;
    productName: string;
    categoryName: string;
    brandName: string;
    thumbnail: string;
    price: number;
    size: number;
}

export interface Image {
    imageUrl: string;
}

export interface SizePrice {
    size: number;
    price: number;
}

export interface ProductDetail {
    id: number;
    productName: string;
    description: string | null;
    categoryName: string;
    brandName: string;
    // productImages: Image[];
    productImages: string[];
    productSizePrices: SizePrice[];
}

export interface CategoryOption {
    id: number;
    categoryName: string;
}

export interface BrandOption {
    id: number;
    brandName: string;
}

export interface SizeOption {
    id: number;
    value: number;
}

export interface ProductFormData {
    categories: CategoryOption[];
    brands: BrandOption[];
    sizes: SizeOption[];
}

export interface CreateProductRequest {
    productName: string;
    description?: string;
    categoryId: number;
    brandId: number;
    sizePrices: CreateProductSizePrice[];
    images: CreateProductImage[];
}

export interface CreateProductSizePrice {
    sizeId: number;
    price: number;
}

export interface CreateProductImage {
    file: File;
    displayOrder: number;
}