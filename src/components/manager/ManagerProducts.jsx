import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance';
import ManagerProductCard from './ManagerProductCard';
import toast from 'react-hot-toast';
import CustomToast from '../common/CustomToast';

const ManagerProducts = () => {

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



  const deleteProduct = async (id) => {

    toast.custom((t) => (
      <CustomToast

        message="Are you sure? You want to delete"
        action='Delete'

        onDone={
          async () => {
            toast.dismiss(t.id);
            try {

              if (id) {
                const res = await axiosInstance.delete(`/product//delete-product/${id}`);
                const resData = res.data;
                console.log(resData);

                setProducts((preProducts) => preProducts.filter((product) => product._id !== id));

                toast.success('Deleted successfully');
              }

            } catch (error) {
              console.log(error);
              toast.error('Delete Failed')
            }
          }
        }

        onCancel={() => {
          toast.dismiss(t.id);
          toast.error('Canceled!')
        }}

      />
    ), { duration: Infinity });
  }



  return (
    <div className='pt-24 px-10'>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-6 auto-rows-auto mx-10' >

        {
          products && products.map((product) =>
            <ManagerProductCard key={product._id} productId={product._id} name={product.name} price={product.price} image={product.images[0]} colors={product.colors} onDeleteProduct={deleteProduct} />
          )
        }

      </div>

    </div>
  )
}

export default ManagerProducts
