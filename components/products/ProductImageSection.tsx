type ProductImage = {
    file: File;
    preview: string;
}

type Props = {
    images: ProductImage[];
    imageErrors: string[];
    onAddImage: (files: FileList) => void;
    onRemoveImage: (index: number) => void;
}

export default function ProductImageSection({
    images,
    imageErrors,
    onAddImage,
    onRemoveImage
}: Props) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <label className="font-medium">
                    Hình ảnh
                </label>
            </div>

            {imageErrors.map((error, index) => (
                <p
                    key={index}
                    className="text-sm text-red-500">
                    {error}
                </p>
            ))}

            <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded border">

                        <img
                            src={image.preview}
                            alt=""
                            className="h-full w-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={() => onRemoveImage(index)}
                            className="absolute right-2 top-2 h-6 w-6 rounded-full bg-red-500 text-white cursor-pointer">

                            &times;
                        </button>

                        <div
                            className="absolute left-2 bottom-2 rounded bg-black/60 px-2 py-1 text-xs text-white">

                            #{index + 1}
                        </div>
                    </div>
                ))}

                <label
                    htmlFor="image-upload"
                    className="flex aspect-square cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-500">

                    <input
                        id="image-upload"
                        type="file"
                        multiple
                        hidden
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => {
                            if (!e.target.files) return;
                            onAddImage(e.target.files);
                            e.target.value = "";
                        }}
                    />

                    <div className="text-center">
                        <div className="text-2xl">
                            +
                        </div>

                        <div>
                            Thêm hình ảnh
                        </div>
                    </div>
                </label>
            </div>
        </div>
    )
}