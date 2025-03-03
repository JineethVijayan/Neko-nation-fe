import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";

// Create the context
const UserContext = createContext();

// Custom hook to access UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user on app load (from backend or localStorage)
  useEffect(() => {
    let isMounted = true;

    const fetchCurrentUser = async () => {
      try {
        const res = await axiosInstance.get("/user/get-current-user", {
          withCredentials: true, // Ensure cookies are sent
        });

        if (isMounted) {
          setCurrentUser(res.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching user:", error);
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCurrentUser();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  // Fetch user's bag item count
  useEffect(() => {
    const fetchItemCount = async () => {
      if (!currentUser) return;

      try {
        const res = await axiosInstance.get(`/bag/get-bag/${currentUser._id}`);
        setItemCount(res.data.bag?.totalItems || 0);
      } catch (error) {
        console.error("Error fetching bag item count:", error);
        setItemCount(0);
      }
    };

    fetchItemCount();
  }, [currentUser]);

  // Function to update user
  const saveUser = (userData) => {
    setCurrentUser(userData);
  };

  

  const clearUser = () => {
         setCurrentUser(null); // Clear the user in state
        
        setItemCount(0); // Reset item count
       
       };

  return (
    <UserContext.Provider value={{ currentUser, itemCount, saveUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
