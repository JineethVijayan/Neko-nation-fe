import React, { useState } from "react";
import "./ImageGallery.css"

const ImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Left Section - Thumbnails */}
            <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 
                            overflow-x-auto md:overflow-y-auto max-h-[480px] 2xl:max-h-[880px] justify-between no-scrollbar">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        className={`w-24 h-24 object-cover border rounded cursor-pointer ${
                            selectedImage === image ? "border-blue-500" : "border-gray-300"
                        }`}
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>

            {/* Right Section - Large Image */}
            <div className="flex-1 flex justify-center items-center ">
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full py-0 max-h-[880px] md object-contain border border-gray-300 rounded-md"
                />
            </div>
        </div>
    );
};

export default ImageGallery;
