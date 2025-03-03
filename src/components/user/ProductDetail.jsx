import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../config/axiosInstance';
import { useUser } from '../../context/UserContext';
import ImageGallery from './ImageGallery';


const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState([]);

    const { currentUser, itemCount, setItemCount, loading } = useUser();

    useEffect(() => {
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

    const [selectedColor,setSelectedColor] =useState('');

    const handleSize = (size) => setSelectedSize(size);
const handleColor = (color) => setSelectedColor(color);
    

    // console.log(selectedSize);





    console.log(currentUser);


    // if(currentUser){

    //     let userid = currentUser._id;

    //     return userid;
    // }

    // console.log(userid);

    //console.log(id);

    const navigate = useNavigate();

    const submitData = async () => {
        if (!currentUser) {
            alert('please login first');
            navigate('/user/signin');
            return;
        };
        if (!selectedSize) {
            alert('please select size first');
            return;
        }

        try {
            const userId = await currentUser._id;
            const productId = await product._id;
            const size = selectedSize;
            const color = selectedColor ;
            console.log(userId, productId, size);


            const res = await axiosInstance.post('/bag/add-bag', { userId, productId, size, color });
            const resData = res.data;
            setItemCount(resData.bag.totalItems)
            console.log(resData);
            // navigate('/user/bag')

        } catch (error) {
            console.log('error', error);

        }
    }

    return (
        <div className='pt-24'>
            <div>


                <div className='grid  grid-cols-4'>

                    <div className=' col-span-2 '>
                        {
                            product.images && <ImageGallery images={product.images} />
                        }
                    </div>

                    <div className='col-span-2 p-10  '>
                        <h1 className='text-4xl'>{product.name}</h1>

                        <h1 className='text-3xl mt-10'>₹ {product.price}</h1>

                        <div className='grid grid-flow-col w-56  mt-10'>

                            {
                                product.sizes?.map((size, index) => (
                                    <p onClick={() => handleSize(size)} className={`cursor-pointer px-4 py-2 me-2  ${selectedSize === size
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                        }`} key={index}>{size}</p>
                                ))
                            }


                        </div>


                        <div className='grid grid-flow-col w-56  mt-10'>

{
    product.colors?.map((color, index) => (
        <p onClick={() => handleColor(color)} className={`cursor-pointer px-4 py-2 me-2  ${ selectedColor === color
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
            }`} key={index}>{color}</p>
    ))
}



</div>


                        <button onClick={() => submitData()} className=' mt-10 bg-black text-white p-4 rounded w-3/4 '>Add To Bag</button>

                        <div className='cursor-pointer  mt-16 flex flex-row justify-between ' onClick={() => onSelect()}>  <div className='text-xl'>Description</div> <div>⌄</div></div>
                        {
                            description === true && <div className='pt-8'>{product.description}</div>
                        }
                        <hr className='text-2xl  mt-3' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
