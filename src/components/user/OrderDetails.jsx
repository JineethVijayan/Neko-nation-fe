import React, { useEffect, useState } from 'react'
import Address from './Address'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { useUser } from '../../context/UserContext';

const OrderDetails = () => {

    const { id } = useParams();

    // console.log(id);


    const { currentUser, loading: userLoading } = useUser();

    const [selectedAddress, setSelectedAddress] = useState(null);


    const radioChange = (address) => {
        // console.log('Selected address:', address);
        setSelectedAddress(address);
    };



    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);





    const handlePayment = async () => {

        try {

            // let user = await currentUser.firstName;
            const userId = await currentUser._id
            const bagId = id;
            if (!selectedAddress) {
                alert('Please add or select an address');
                return;
            }
    
            const addressId = selectedAddress._id;
    
            console.log(`userId: ${userId}, bagId: ${bagId}, addressId: ${addressId}`);

            // Step 1: Create Razorpay order
            const { data } = await axiosInstance.post('/payment/create-order', { id });

            const options = {
                key: import.meta.env.VITE_SOME_KEY,
                amount: data.amount,
                currency: 'INR',
                order_id: data.razorpayOrderId,
                name: 'Neko Nation',
                description: 'Payment for your order',
                handler: async function (response) {
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
                    

                    if (paymentResponse.data.message ==="Payment Successfully") {
                        alert('Payment successful, order created!');
                    } else {
                        alert('Payment verification failed!');
                    }
                },
                prefill: {
                    name: 'john',
                    email: 'johndoe@example.com',
                    contact: '9999999999',
                },
            };

            const razorpay = new Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
        }
    };




    return (
        <div>

            <div className='grid grid-cols-5 justify-between  pt-24'>
                <div className=' col-span-3'>
                    <Address handleRadioChange={radioChange} selectedAddress={selectedAddress} />
                </div>
                <div className='col-span-2 justify-items-center'>
                    <div>

                    </div>
                    <div >
                        <button onClick={handlePayment} className='bg-black text-white p-2 hover:bg-slate-900 w-full'>PROCEED TO PAY</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails
