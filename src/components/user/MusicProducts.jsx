import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance';
import UserProductCard from './UserProductCard';

const MusicProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProdutsByInterests = async () => {

            const interests = 'Music'

            try {
                const res = await axiosInstance.get(`/product/product-by-interests/${interests}`);
                const resData = res.data;
                console.log(resData);
                setProducts(resData);
            } catch (error) {
                console.log('error:', error);
            }
        }
       getProdutsByInterests();
    }, [])

    return (
        <div className='pt-24 px-10'>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-6 auto-rows-auto mx-10' >
  
          {
            products ? products.map((product) =>
              <UserProductCard key={product._id} productId={product._id} name={product.name}  price= {product.price} image= {product.images[0]} colors={product.colors} />
            ) : ( <div className='pt-24 text-red-700'>products loading</div> )
          }
  
        </div>
  
      </div>
    )
}

export default MusicProducts
