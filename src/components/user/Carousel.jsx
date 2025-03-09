import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const getPosters = async () => {
      try {
        const res = await axiosInstance.get("/poster/get-posters");
        const resData = await res.data;
        const allImages = resData.flatMap((poster) => poster.images);
        setPosters(allImages);
      } catch (error) {
        console.log(error);
      }
    };
    getPosters();
  }, []);

  useEffect(() => {
    if (posters.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [posters.length]);

  return (
    <div className="relative w-full h-[150px] sm:h-[320px] xs:h-[200px] overflow-hidden pt-">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {posters.map((poster, index) => (
          <div
            key={index}
            className="h-[150px] sm:h-[320px] xs:h-[200px] min-w-full flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          ></div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={() =>
          setCurrentIndex(currentIndex === 0 ? posters.length - 1 : currentIndex - 1)
        }
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 sm:p-1 rounded-full"
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % posters.length)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 sm:p-1 rounded-full"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 w-full flex justify-center">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
