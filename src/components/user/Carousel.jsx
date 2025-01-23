import React, { useState, useEffect } from 'react';

const Carousel = () => {


    const images = [
      
        '../images/carousel-1.jpg',
        '../images/Shop-Cover.png',
        '../images/carousel-2.jpg',
        '../images/carousel-3.jpg',
        '../images/carousel-4.jpg',
        '../images/carousel-5.jpg',
        '../images/test-fullsize.jpg',
        '../images/mern-cover1.jpeg',
    ]


    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide function using useEffect
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(intervalId); // Clear interval on unmount
    }, [images.length]);

    return (
        <div className="relative w-full h-full overflow-hidden ">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="min-w-full h-96 bg-no-repeat bg-cover bg-center text-center" style={{ backgroundImage: `url(${image})` }}>
                        <h1>hiiii guyss</h1>
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={() =>
                    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
                }
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2"
            >
                &#10094;
            </button>

            {/* Next Button */}
            <button
                onClick={() =>
                    setCurrentIndex((currentIndex + 1) % images.length)
                }
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2"
            >
                &#10095;
            </button>

            {/* Indicators */}
            <div className="absolute bottom-0 w-full flex justify-center mb-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 mx-1 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
