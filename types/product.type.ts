export interface ProductList {
    id: number;
    productName: string;
    categoryName: string;
    brandName: string;
    thumbnail: string;
    price: number;
    size: number;
}

export interface ImageDTO {
    imageUrl: string;
}

export interface SizePriceDTO {
    size: number;
    price: number;
}

export interface ProductDTO {
    id: number;
    productName: string;
    description?: string;
    categoryName: string;
    brandName: string;
    productImages: ImageDTO[];
    productSizePrices: SizePriceDTO[];
}