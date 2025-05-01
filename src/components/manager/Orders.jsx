import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance';
import ActionDropdown from './ActionDropdown';

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const [orderCount, setOrderCount] = useState()

    const [actions, setActions] = useState({

    });

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axiosInstance.get("/order/get-all-orders");
                const resData = res.data;
                console.log(resData);
                setOrders(resData.orders.reverse());
                setOrderCount(resData.totalOrders)
            } catch (error) {
                console.log(error);

            }
        }
        getOrders();
    }, [])

    const handleActions = (value, index) => {
        setActions((preValue) => {
            return {
                ...preValue,
                [index]: value
            }
        })
    }

    const updateOrder = async(value,orderId)=>{
        try {
            const res = await axiosInstance.put("/order/update-order",{orderId,orderStatus:value});
            const resdata = res.data;
            console.log(resdata);
           setOrders(resdata.orders)
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className='pt-24'>

            <h1 className='p-6 font-semibold text-2xl'>Total Orders : <span className='border bg-gray-300 px-4 py-2'>{orderCount}</span></h1>

            <table className='border-collapse border border-gray-400 w-full mt-6 mb-6'>
                <thead>
                    <tr className='bg-gray-100 border border-gray-400 '>
                        <th className=" px-4 py-2" >Id</th>
                        <th className="px-4 py-2" >Date</th>
                        <th className="px-4 py-2" >Customer</th>
                        <th className=" px-4 py-2" >Payment Status</th>
                        <th className=" px-4 py-2" >Order Status</th>
                        <th className=" px-4 py-2" >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => (

                            <tr key={order._id} className="text-center  text-gray-600">
                                <td className="px-4 py-2" >#{order._id}</td>
                                <td className="px-4 py-2" >{
                                    new Date(order.createdAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true, // Ensures AM/PM format
                                    })
                                }</td>
                                <td className="px-4 py-2" >{order.user.firstName}</td>
                                <td className="px-4 py-2" >{order.paymentStatus}</td>
                                <td className="px-4 py-2" >
                                    <select value={order.status} onChange={(e)=>updateOrder(e.target.value,order._id)}>
                                        <option value='shipped'>shipped</option>
                                        <option value='pending'>pending</option>
                                        <option value='delivered'>delivered</option>
                                        <option value='canceled'>canceled</option>
                                    </select>
                                </td>
                                <td className='px-4 py-2'>
                                    <ActionDropdown onAction={handleActions} id={order._id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </div>
    )
}

export default Orders
