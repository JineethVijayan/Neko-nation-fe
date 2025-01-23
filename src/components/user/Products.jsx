import React, { useEffect, useState } from 'react'
import UserProductCard from './UserProductCard'
import axiosInstance from '../../config/axiosInstance';

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProduct = async () => {

      try {

        const res = await axiosInstance.get('product/get-all-production')
        const resData = await res.data;
        setProducts(resData);

      } catch (error) {
        console.log(`error`, error);
      }

    }

    getAllProduct();

  }, []);




  return (
    <div className='pt-24 px-10'>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-6 auto-rows-auto mx-10' >

        {
          products && products.map((product) =>
            <UserProductCard key={product._id} productId={product._id} name={product.name}  price= {product.price} image= {product.images[0]} colors={product.colors} />
          )
        }

      </div>

    </div>
  )
}

export default Products
