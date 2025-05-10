import React from 'react'
import { Link } from 'react-router-dom'

const GenderSection = () => {
    return (
        <div className=' grid grid-cols-2 h-96 px-8 pt-12 pb-10 gap-6'>

            <Link to={'/products/male'} className='bg-blue-600 rounded-xl flex-shrink-0 bg-cover bg-center' style={{ backgroundImage: `url(../images/man.jpg)` }}>
               
            </Link>
            <Link to={'/products/women'} className='bg-pink-600 rounded-xl flex-shrink-0 bg-cover bg-center' style={{backgroundImage:`url(../images/woman.jpg)`}}>
               
            </Link>

        </div>
    )
}

export default GenderSection
