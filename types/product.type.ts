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
    description?: string;
    categoryName: string;
    brandName: string;
    // productImages: Image[];
    productImages: string[];
    productSizePrices: SizePrice[];
}