import React, { useEffect, useState } from 'react'
import UserProductCard from './UserProductCard'
import axiosInstance from '../../config/axiosInstance';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllProduct = async () => {
      setLoading(true);
      try {

        const res = await axiosInstance.get('product/get-all-production')
        const resData = await res.data;
        setProducts(resData);

      } catch (error) {
        console.log(`error`, error);
      } finally {
        setLoading(false);
      }

    }

    getAllProduct();

  }, []);




  return (
    <div className='pt-24 px-10'>

      {
        loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) :
          (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-6 auto-rows-auto mx-10' >

              {
                products && products.map((product) =>
                  <UserProductCard key={product._id} productId={product._id} name={product.name} price={product.price} image={product.images[0]} colors={product.colors} />
                )
              }

            </div>
          )
      }


    </div>
  )
}

export default Products
