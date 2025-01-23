// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';

// Create the context
const UserContext = createContext();

// Custom hook to access the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const storedUser = localStorage.getItem('currentUser');
//         if (storedUser) {
//           setCurrentUser(JSON.parse(storedUser));
//         } else {
//           const res = await axiosInstance.get('/user/get-current-user'); // Replace with your API endpoint
//           setCurrentUser(res.data);
//           localStorage.setItem('currentUser', JSON.stringify(res.data));
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setCurrentUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, []);



useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted
  
    const fetchCurrentUser = async () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser && isMounted) {
          setCurrentUser(JSON.parse(storedUser)); // Set user from localStorage
        } else if (isMounted) {
          const res = await axiosInstance.get('/user/get-current-user');
          setCurrentUser(res.data);
          localStorage.setItem('currentUser', JSON.stringify(res.data));
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user:', error);
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchCurrentUser();
  
    return () => {
      isMounted = false; // Cleanup on component unmount
    };
  }, []);
  
  
   // Fetch the item count for the bag
   useEffect(() => {
    const fetchItemCount = async () => {
      if (!currentUser) return;

      try {
        const res = await axiosInstance.get(`/bag/get-bag/${currentUser._id}`);
        setItemCount(res.data.bag?.totalItems || 0); // Update item count
      } catch (error) {
        console.error('Error fetching bag item count:', error);
        setItemCount(0); // Reset to 0 if there's an error
      }
    };

    fetchItemCount();
  }, [currentUser]);

 

  const clearUser = () => {
    setCurrentUser(null); // Clear the user in state
    localStorage.removeItem('currentUser'); // Remove user data from localStorage
    localStorage.removeItem('jwtToken'); // Remove the JWT token
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser,itemCount, setItemCount, loading, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};




