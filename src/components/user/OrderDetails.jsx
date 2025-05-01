import React, { useEffect, useState } from 'react'
import Address from './Address'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

const OrderDetails = () => {

    const { id } = useParams();

    // console.log(id);

    const navigate = useNavigate();

    const { currentUser, loading: userLoading } = useUser();

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [bag, setBag] = useState([]);

    const radioChange = (address) => {
        // console.log('Selected address:', address);
        setSelectedAddress(address);
    };


    useEffect(() => {
        const getBag = async () => {


            try {
                const bagId = id;
                console.log("Fetching bag :", bagId);

                const res = await axiosInstance.get(`bag/get-bag-byId/${bagId}`);
                const resData = res.data;
                console.log("Bag data fetched:", resData);

                setBag(resData.bag);

            } catch (error) {
                console.error("Error fetching bag:", error);
            }
        };

        if (!userLoading) {
            getBag();
        }
    }, [currentUser, userLoading]);



    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);





    // const handlePayment = async () => {

    //     try {

    //         // let user = await currentUser.firstName;
    //         const userId = await currentUser._id
    //         const bagId = id;
    //         if (!selectedAddress) {
    //             alert('Please add or select an address');
    //             return;
    //         }

    //         const addressId = selectedAddress._id;

    //         console.log(`userId: ${userId}, bagId: ${bagId}, addressId: ${addressId}`);

    //         // Step 1: Create Razorpay order
    //         const { data } = await axiosInstance.post('/payment/create-order', { id });

    //         const options = {
    //             key: import.meta.env.VITE_SOME_KEY,
    //             amount: data.amount,
    //             currency: 'INR',
    //             order_id: data.razorpayOrderId,
    //             name: 'Neko Nation',
    //             description: 'Payment for your order',
    //             handler: async function (response) {
    //                 // Step 2: Send payment details to backend for verification
    //                 const paymentResponse = await axiosInstance.post('/payment/verify', {
    //                     razorpayPaymentId: response.razorpay_payment_id,
    //                     razorpayOrderId: response.razorpay_order_id,
    //                     razorpaySignature: response.razorpay_signature,
    //                     userId,
    //                     addressId,
    //                     bagId,
    //                 });

    //                 console.log(paymentResponse);


    //                 if (paymentResponse.data.message === "Payment Successfully") {
    //                     alert('Payment successful, order created!');
    //                     navigate('/')
    //                 } else {
    //                     alert('Payment verification failed!');
    //                 }
    //             },
    //             prefill: {
    //                 name: currentUser.firstName,
    //                 email: currentUser.email,
    //                 contact: '9999999999',
    //             },
    //         };

    //         const razorpay = new window.Razorpay(options);
    //         razorpay.open();
    //     } catch (error) {
    //         console.error('Payment error:', error);
    //     }
    // };



    const handlePayment = async () => {
        try {

            if(!currentUser){
                toast.error('User not found , Please login and try again');
                return;
            }

            if(!selectedAddress){
                toast.error('Please create or select an address');
                return;
            }

    
            const userId = currentUser._id;
            const bagId = id; 
    
            if (!bagId) {
                toast.error('Bag Id missing try again ');
                return;
            }
    
            const addressId = selectedAddress._id;
    
            console.log(`userId: ${userId}, bagId: ${bagId}, addressId: ${addressId}`);
    
            // Step 1: Create Razorpay order
            const { data } = await axiosInstance.post('/payment/create-order', { id: bagId });
    
            if (!data || !data.razorpayOrderId || !data.amount) {
                console.error('Invalid response from /payment/create-order:', data);
                toast.error('Failed to initiate payment. Please try again.');
                return;
            }
    
            const options = {
                key: import.meta.env.VITE_SOME_KEY, // Ensure this matches your .env variable
                amount: data.amount,
                currency: 'INR',
                order_id: data.razorpayOrderId,
                name: 'Neko Nation',
                description: 'Payment for your order',
                handler: async function (response) {
                    try {
                        // Step 2: Send payment details to backend for verification
                        const paymentResponse = await axiosInstance.post('/payment/verify', {
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            userId,
                            addressId,
                            bagId,
                        });
    
                        console.log(paymentResponse);
    
                        if (paymentResponse.data.message === "Payment Successfully") {
                            toast.success('Payment successful, order created!');
                            navigate('/');
                        } else {
                            toast.error('Payment verification failed!');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        toast.error('Error verifying payment. Please try again.');
                    }
                },
                prefill: {
                    name: currentUser.firstName || 'User',
                    email: currentUser.email || 'user@example.com',
                    contact: '7510342850',
                },
                method: {
                    upi: true,  // Ensure UPI payments are enabled
                  }
            };
    
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('An error occurred while processing the payment.');
        }
    };
    




    return (
        <div className='p-10 sm:p-0'>

            <div className='sm:grid grid-cols-4 justify-between  pt-24'>

                <div className=' col-span-2 justify-self-start sm:ms-24'>
                    <Address handleRadioChange={radioChange} selectedAddress={selectedAddress} />
                </div>

                <div className='col-span-2 sm:justify-self-start   '>

                    <div className='sm:ms-24 w-full sm:w-96 mt-6 sm:mt-0'>
                        <h1 className='text-2xl font-bold'>Price Details</h1>

                        <div className='p-6 border rounded-lg my-4'>
                            <h1 className='flex justify-between text-xl'> <span>Total Price </span> <span> ₹  {bag.totalPrice} /-</span></h1>
                            <h1 className='flex justify-between text-xl'> <span>Total Quantity </span> <span>{bag.totalItems}</span></h1>
                            <h1 className='flex justify-between text-xl'> <span>Delivery charges </span>  <span > <span className='line-through decoration-red-500'>99 /-</span> <span className=' ms-2 text-green-500'>Free</span></span> </h1>
                        </div>
                        <div className='pt-6'>
                            <h1 className='flex justify-between text-2xl font-bold py-6'> <span>Total Payable </span> <span> ₹  {bag.totalPrice} /-</span></h1>
                        </div>
                        <div className='' >
                            <button onClick={handlePayment} className='bg-black text-white p-2 rounded-lg hover:bg-gray-300 hover:text-black w-full'>PROCEED TO PAY</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails
