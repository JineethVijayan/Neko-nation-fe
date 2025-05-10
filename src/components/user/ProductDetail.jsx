import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../config/axiosInstance';
import { useUser } from '../../context/UserContext';
import ImageGallery from './ImageGallery';
import toast from 'react-hot-toast';
import CustomToast from '../common/CustomToast';


const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState([]);

    const { currentUser, itemCount, setItemCount, loading } = useUser();

    useEffect(() => {

        window.scrollTo(0, 0);

        const getProductByid = async () => {
            try {

                const res = await axiosInstance.get(`product/get-productBy-id/${id}`);

                const resData = res.data;
                console.log(resData);

                setProduct(resData);

            } catch (error) {
                console.log('error: ', error);

            }
        }
        getProductByid();
    }, [id])



    const [description, setDescription] = useState(false);

    const onSelect = () => setDescription((preValue) => !preValue);



    const [selectedSize, setSelectedSize] = useState('');

    const [selectedColor, setSelectedColor] = useState('');

    const handleSize = (size) => setSelectedSize(size);
    const handleColor = (color) => setSelectedColor(color);


    const navigate = useNavigate();

    const submitData = async () => {
        if (!currentUser) {
            toast.custom((t) => (
                <CustomToast
                    message="Please login or create an account"
                    onDone={() => {
                        toast.dismiss(t.id);
                        navigate("/user/signin");

                    }}
                    onCancel={() => {
                        toast.dismiss(t.id);
                        toast.error('Cancelled!');

                    }}
                />
            ), { duration: Infinity });
            return;
        };
        if (!selectedSize) {
            toast.error('please select size first')
            return;
        }

        if (!selectedColor) {
            toast.error('please select color');
            return;
        }

        try {
            const userId = await currentUser._id;
            const productId = await product._id;
            const size = selectedSize;
            const color = selectedColor;
            console.log(userId, productId, size);


            const res = await axiosInstance.post('/bag/add-bag', { userId, productId, size, color });
            const resData = res.data;
            setItemCount(resData.bag.totalItems)
            toast.success('Item successfully added')

        } catch (error) {
            console.log('error', error);

        }
    }

    return (
        <div className='pt-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-4'>
      
          {/* Left Side: Image Gallery */}
          <div>
            {product.images && <ImageGallery images={product.images} />}
          </div>
      
          {/* Right Side: Product Info */}
          <div className='p-4'>
            <h1 className='text-2xl md:text-4xl'>{product.name}</h1>
      
            <h1 className='text-xl md:text-3xl mt-6'>₹ {product.price}</h1>
      
            {/* Size Selector */}
            <div className='grid grid-flow-col auto-cols-max gap-2 mt-6'>
              {product.sizes?.map((size, index) => (
                <p
                  key={index}
                  onClick={() => handleSize(size)}
                  className={`cursor-pointer px-4 py-2 rounded text-center text-sm ${
                    selectedSize === size
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {size}
                </p>
              ))}
            </div>
      
            {/* Color Selector */}
            <div className='grid grid-flow-col auto-cols-max gap-2 mt-6'>
              {product.colors?.map((color, index) => (
                <p
                  key={index}
                  onClick={() => handleColor(color)}
                  className={`cursor-pointer px-4 py-2 rounded text-center text-sm ${
                    selectedColor === color
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {color}
                </p>
              ))}
            </div>
      
            <button
              onClick={submitData}
              className='mt-8 bg-black text-white p-4 rounded w-full'
            >
              Add To Bag
            </button>
      
            {/* Description Toggle */}
            <div
              className='cursor-pointer mt-10 flex items-center justify-between'
              onClick={onSelect}
            >
              <div className='text-lg font-semibold'>Description</div>
              <div className='text-xl'>⌄</div>
            </div>
            {description && <div className='pt-4 text-sm'>{product.description}</div>}
      
            <hr className='mt-6' />
          </div>
        </div>
      </div>
      
    )
}

export default ProductDetail
