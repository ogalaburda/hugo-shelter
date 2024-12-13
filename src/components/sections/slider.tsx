import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';
import { Navigation, Thumbs } from 'swiper/modules';
import MediaDisplayBlock, { MediaDisplayProps } from '../blocks/MediaDisplayBlock';

interface ZoomSliderProps {
    mediaItems: MediaDisplayProps[]; // Array of media (image or video)
}

const ZoomSlider: React.FC<ZoomSliderProps> = ({ mediaItems }) => {
    const [activeIndex, setActiveIndex] = useState(0); // Track the active media index
    const [isZoomMode, setIsZoomMode] = useState(false); // Track zoom mode state
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [mainSwiper, setMainSwiper] = useState<any>(null); // Reference for the main Swiper

    // Handle thumbnail click to update the main Swiper
    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
        mainSwiper?.slideTo(index); // Sync main Swiper with the clicked thumbnail
    };

    // Navigation buttons for Zoom Mode
    const renderZoomNavigation = () => (
        <>
            {activeIndex > 0 && (
                <button
                    className="absolute left-5 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
                    onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                >
                    ←
                </button>
            )}
            {activeIndex < mediaItems.length - 1 && (
                <button
                    className="absolute right-5 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
                    onClick={() => setActiveIndex((prev) => Math.min(prev + 1, mediaItems.length - 1))}
                >
                    →
                </button>
            )}
        </>
    );

    return (
        <div className="relative">
            {/* Main Swiper */}
            <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                slidesPerView={1}
                spaceBetween={10}
                onSwiper={setMainSwiper} // Set the reference for the main Swiper
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Sync activeIndex with Swiper's active index
                className="my-5"
            >
                {mediaItems.map((media, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={index === activeIndex && !isZoomMode ? () => setIsZoomMode(true) : undefined}
                    >
                        <MediaDisplayBlock {...media} className="w-full h-96 object-cover rounded-lg shadow-md cursor-pointer" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Slider */}
            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper} // Set the reference for the thumbnail slider
                slidesPerView={5}
                spaceBetween={10}
                watchSlidesProgress
                className="my-3"
            >
                {mediaItems.map((media, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${
                                index === activeIndex ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <MediaDisplayBlock {...media} className="w-full h-full object-cover" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Zoom Mode */}
            {isZoomMode && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    {/* Zoomed Image */}
                    <div className="relative">
                        <button
                            onClick={() => setIsZoomMode(false)}
                            className="absolute top-2 right-2 text-black bg-white rounded p-3 z-50"
                        >
                            ×
                        </button>
                        <MediaDisplayBlock
                            {...mediaItems[activeIndex]}
                            className="w-[130%] h-[130%] max-w-[80vw] max-h-[80vh] object-contain transition-transform duration-300 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Zoom Navigation */}
                    {renderZoomNavigation()}
                </div>
            )}
        </div>
    );
};

export default ZoomSlider;
