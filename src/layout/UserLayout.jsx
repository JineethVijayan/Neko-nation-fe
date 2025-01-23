import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/navbar/UserNavbar'



const UserLayout = () => {
    return (
        <div className=''>
            
                <UserNavbar />

            <Outlet />
   
        </div>
    )
}

export default UserLayout
