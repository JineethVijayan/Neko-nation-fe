import React from 'react'
import { Link } from 'react-router-dom'

const GenderSection = () => {
    return (
        <div className=' grid grid-cols-2 h-96 p-8 gap-6'>

            <Link to={'/products/male'} className='bg-blue-600 rounded-xl'>
                <h1>Men</h1>
            </Link>
            <Link to={'/products/women'} className='bg-pink-600 rounded-xl'>
                <h1>Women</h1>
            </Link>

        </div>
    )
}

export default GenderSection
