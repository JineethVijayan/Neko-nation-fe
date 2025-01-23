import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const { currentUser,setCurrentUser, clearUser } = useUser();
    const navigate = useNavigate();
    console.log(currentUser);

    useEffect(() => {
        if (!currentUser) {
            navigate('/user/signin');
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        setCurrentUser(null)
        clearUser();
        // navigate('/user/signin')
    }



    return (
        <div className='pt-24'>
            {currentUser &&
                <div>
                    <h1>{currentUser.firstName} {currentUser.lastName}</h1>
                    <h1>{currentUser.email}</h1>
                    <button onClick={handleLogout}>logout</button>
                </div>
            }
        </div>
    )
}

export default Profile
