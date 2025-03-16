import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import Lucide icons

const Interests = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Function to handle scrolling
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300; // Adjust scroll speed
            scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    // Check scroll position and update button visibility
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // Adjusted for precision
        }
    };

    // Ensure scroll buttons are set correctly when component mounts
    useEffect(() => {
        handleScroll();
    }, []);

    return (
        <div className="p-8 pt-0 relative">
            <h1 className="p-4 text-2xl font-semibold font-sans">Interests</h1>

            {/* Left Scroll Button (Only Show When Can Scroll Left) */}
            {canScrollLeft && (
                <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="text-gray-600 w-6 h-6" />
                </button>
            )}

            {/* Scrollable container */}
            <div 
                className="ps-4 flex overflow-x-auto no-scrollbar gap-10 whitespace-nowrap scroll-smooth" 
                ref={scrollRef} 
                onScroll={handleScroll}
            >
                {/* Cards */}
                <Link to={'/product/interests/culture'} 
                    className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl"  
                    style={{ backgroundImage: "url('../images/culture.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    Culture
                </Link>
                <Link to={'/product/interests/movies'} 
                    className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl" 
                    style={{ backgroundImage: "url('../images/movies.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    Movies
                </Link>
                <Link to={'/product/interests/sports'} 
                    className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl" 
                    style={{ backgroundImage: "url('../images/sports.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    Sports
                </Link>
                <Link to={'/product/interests/anime'} 
                    className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl" 
                    style={{ backgroundImage: "url('../images/anime.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    Anime
                </Link>
                <Link to={"/product/interests/music"} 
                    className="h-72 min-w-72 bg-black text-white flex items-center justify-center text-2xl" 
                    style={{ backgroundImage: "url('../images/music.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    Music
                </Link>
            </div>

            {/* Right Scroll Button (Only Show When Can Scroll Right) */}
            {canScrollRight && (
                <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="text-gray-600 w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default Interests;
