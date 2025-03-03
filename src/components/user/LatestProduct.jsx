import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance';
import UserProductCard from './UserProductCard';



const LatestProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getLatestProducts = async () => {
            try {
                const res = await axiosInstance.get('product/latest-products');
                const resData = await res.data;
                setProducts(resData);
                console.log(resData);

            } catch (error) {
                console.log('error:', error);
            }
        }
        getLatestProducts();
    }, [])

    return (
        <div className='p-8 pt-0'>
        <h1 className='p-4 text-2xl font-semibold font-sans'>New Drops</h1>
            <div className='  ps-4   flex  
                      overflow-x-auto no-scrollbar  gap-10 '>
                {
                    products ? products.map((product, index) =>
                        <UserProductCard key={product._id} productId={product._id} name={product.name} price={product.price} image={product.images[0]} />
                    ) : (<div>products loading</div>)
                }
            </div>
        </div>
    )
}

export default LatestProduct
