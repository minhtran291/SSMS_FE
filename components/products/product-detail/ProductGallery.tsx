'use client';

import Image from 'next/image';
import { IMAGE_BASE_URL } from '@/lib/api';
import { useState } from "react";

type Props = {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: Props) {
    // state quan ly index cua anh dang hien thi chinh
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // ham xu ly sang trai
    // tuc neu index la 0 roi ma van bam sang trai thi ve anh cuoi, con ko thi ve anh truoc
    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    }

    // ham xu ly sang phai
    // tuc neu index la cuoi roi ma van bam sang phai thi ve anh dau, con ko thi ve anh sau
    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    }
    return (
        <div className="space-y-4">
            <div className="group relative aspect-square overflow-hidden rounded-lg border">
                <Image
                    unoptimized={process.env.NODE_ENV === 'development'}
                    src={`${IMAGE_BASE_URL}${images[selectedImageIndex]}`}
                    alt={productName}
                    fill />

                {/*chi hien thi nut dieu huong neu co nhieu hon 1 anh */}
                {images.length > 1 && (
                    <>
                        {/*nut sang trai*/}
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                            rounded-full bg-white/80 p-2 shadow-md hover:bg-white 
                            transition cursor-pointer md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Previous image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/*nut sang phai*/}
                        <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                            rounded-full bg-white/80 p-2 shadow-md hover:bg-white 
                            transition cursor-pointer md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Next image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => {
                    const isActive = index === selectedImageIndex;

                    return (
                        <button
                            key={image}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative aspect-square overflow-hidden rounded border transition cursor-pointer
                                ${isActive
                                    ? 'border-black ring-2 ring-black/10'
                                    : 'border-gray-200 hover:border-gray-400'}`}>
                            <Image
                                unoptimized={process.env.NODE_ENV === 'development'}
                                src={`${IMAGE_BASE_URL}${image}`}
                                alt={productName}
                                fill />
                        </button>
                    )
                })}
            </div>
        </div>
    );
}