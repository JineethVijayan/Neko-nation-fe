import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../config/axiosInstance';
import UserProductCard from './UserProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const getLatestProducts = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get('product/latest-products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        getLatestProducts();
    }, []);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        handleScroll();
    }, [products]);

    return (
        <div className="p-8 pt-0 relative">
            <h1 className="p-4 text-2xl font-semibold font-sans">New Drops</h1>

            {loading ? ( 
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {/* Left Scroll Button */}
                    {canScrollLeft && products.length > 0 && (
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
                            onClick={() => scroll('left')}
                        >
                            <ChevronLeft className="text-gray-600 w-6 h-6" />
                        </button>
                    )}

                    {/* Scrollable container */}
                    <div
                        className="ps-4 flex overflow-x-auto no-scrollbar gap-10 scroll-smooth"
                        ref={scrollRef}
                        onScroll={handleScroll}
                    >
                        {products.map((product) => (
                            <UserProductCard
                                key={product._id}
                                productId={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.images[0]}
                            />
                        ))}
                    </div>

                    {/* Right Scroll Button */}
                    {canScrollRight && products.length > 0 && (
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
                            onClick={() => scroll('right')}
                        >
                            <ChevronRight className="text-gray-600 w-6 h-6" />
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default LatestProduct;
