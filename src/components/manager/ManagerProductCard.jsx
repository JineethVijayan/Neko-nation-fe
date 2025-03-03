


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ManagerProductCard = (props) => {

    const navigate = useNavigate();

    const navigateTo = () => {
        navigate(``)
    }


    return (
        <div className='w-72  justify-self-center'>

            <div onClick={navigateTo} className="h-72 w-72 bg-no-repeat bg-cover object-cover bg-center text-center" style={{ backgroundImage: `url(${props.image})` }}>

            </div>

            <div className='flex flex-row justify-between '>
                <div className=''>
                    <h1 className='pt-2 text-base not-italic font-medium text-start'>{props.name}</h1>
                </div>
                <div className=''>
                  <h1 className='pt-2 text-start not-italic font-medium'>₹ {props.price} </h1>
                </div>
               
            </div>

            <div className='flex justify-between mt-2'>
            <Link to={`/manager/products/update-product/${props.productId}`} className='inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800'>Edit</Link>
            <button className='inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Delete</button>
            </div>

        </div>
    )
}

export default ManagerProductCard
