import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import UserLayout from './layout/UserLayout';
import Home from './components/user/Home';
import Products from './components/user/Products';
import AboutUs from './components/user/AboutUs';
import ContactUs from './components/user/ContactUs';
import UserSignUp from './components/user/UserSignUp';
import UserSignIn from './components/user/UserSignIn';
import ManagerLayout from './layout/ManagerLayout';
import ManagerProducts from './components/manager/ManagerProducts';
import CreateProducts from './components/manager/CreateProducts';
import ManagerProfile from './components/manager/ManagerProfile';
import ProductDetail from './components/user/ProductDetail';
import { UserProvider } from './context/UserContext';
import Profile from './components/user/Profile';
import Bag from './components/user/Bag';
import OrderDetails from './components/user/OrderDetails';



const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/user/products",
        element: <Products />
      },
      {
        path: '/user/products/:id',
        element: <ProductDetail />
      },
      {
        path: "/user/about-us",
        element: <AboutUs />
      },
      {
        path: "/user/bag",
        element: <Bag />
      },
      {
        path:"/order-details/:id",
        element:<OrderDetails />
      },
      {
        path: "/user/contact-us",
        element: <ContactUs />
      },
      {
        path: "/user/signup",
        element: <UserSignUp />
      },
      {
        path: "/user/signin",
        element: <UserSignIn />
      },
      {
        path: "/user/profile",
        element: <Profile />
      }
    ]
  },
  {
    element: <ManagerLayout />,
    children: [
      {
        path: "/manager/products",
        element: <ManagerProducts />
      },
      {
        path: "/manager/create-products",
        element: <CreateProducts />
      },
      {
        path: "/Manager/profile",
        element: <ManagerProfile />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider >
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
