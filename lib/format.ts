export function formatCurrency(price: number): string {
    return price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}