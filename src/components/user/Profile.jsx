import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Profile = () => {

    const { currentUser, setCurrentUser, clearUser } = useUser();
    const navigate = useNavigate();
    console.log(currentUser);

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/user/signin');
    //     }
    // }, [currentUser, navigate]);

   



    return (
        <div className='pt-24'>

            

            {currentUser &&
                <div>
                {/* <h1>{currentUser.firstName} {currentUser.lastName}</h1>
            <h1>{currentUser.email}</h1>
            <button onClick={handleLogout}>logout</button> */}

                    <div className='flex flex-row p-10 item-center'>
                        <div className='w-24 h-24  '>
                            <img src='../public/images/account.png' alt="" />
                        </div>
                        <div className=' p-4'>
                            <h1 className='text-3xl'>Hello <span className='font-bold'>{currentUser.firstName} </span></h1>
                            <div className='pt-1'>
                                <Link to={"/user/profile/user-details"} className='underline '>View details</Link>
                            </div>
                        </div>
                    </div>



                    <div className='grid grid-row-6 grid-flow-col gap-6'>
                        <div className='col-span-1 flex flex-col text-l border-r border-black ms-8'>
                           
                           <Link to={'/user/profile/my-orders'} className='p-3' >My Orders </Link>
                           <Link to={'/user/profile/my-wishlist'} className='p-3'> My Wishlist</Link>
                           <Link to={'/user/profile/my-address'} className='p-3'>my Address</Link>                  
                           <Link to={'/user/profile/terms-of-use'} className='p-3'>Terms Of Use</Link>
                           <Link to={'/user/profile/privacy-and-policy'} className='p-3'>Privacy Policy</Link>
                        </div>
                        <div className='col-span-5'>
                            <Outlet />
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default Profile
