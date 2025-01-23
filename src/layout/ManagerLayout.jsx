import React from 'react'
import ManagerNavbar from '../components/navbar/ManagerNavbar'
import { Outlet } from 'react-router-dom'

const ManagerLayout = () => {
    return (
        <div>

            <ManagerNavbar />

            <Outlet />

        </div>
    )
}

export default ManagerLayout
