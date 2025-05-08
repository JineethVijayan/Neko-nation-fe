import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProductCard = (props) => {

    const navigate = useNavigate();

    const navigateTo = () => {
        navigate(`/user/products/${props.productId}`)
    }





    return (
        <div className='w-72  justify-self-center'>

            <div onClick={navigateTo} className="h-[388px] w-72 bg-no-repeat bg-cover object-cover bg-center text-center" style={{ backgroundImage: `url(${props.image})` }}>

            </div>

            <div className='flex flex-col justify-center'>
                <div className=' pt-2 text-base not-italic font-medium text-start'>
                    {props.name}
                </div>
                <div className='pe-6 pt-2 text-start not-italic font-medium'>
                    ₹ {props.price}
                </div>




            </div>

        </div>
    )
}

export default UserProductCard
