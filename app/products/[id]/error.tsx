'use client';

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="p-10">
            <h1 className="text-3xl">Có lỗi xảy ra</h1>
            <p className="text-red-500">Không thể lấy sản phẩm.</p>
            {process.env.NODE_ENV === 'development' && (
                <p className="mt-2 text-sm text-gray-600">
                    Chi tiết lỗi: {error.message}
                </p>
            )}
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Thử lại
            </button>
        </main>
    )
}