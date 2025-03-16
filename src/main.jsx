import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
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
import UserDetail from './components/user/UserDetail';
import Myorder from './components/user/Myorder';
import Mywishlist from './components/user/Mywishlist';
import MyAddress from './components/user/MyAddress';
import TermsOfUse from './components/user/TermsOfUse';
import Privacyandpolicy from './components/user/Privacyandpolicy';
import MaleProducts from './components/user/MaleProducts';
import WomenProducts from './components/user/WomenProducts';
import CultureProducts from './components/user/CultureProducts';
import MoviesProducts from './components/user/MoviesProducts';
import SportsProducts from './components/user/SportsProducts';
import AnimeProducts from './components/user/AnimeProducts';
import MusicProducts from './components/user/MusicProducts';
import ProductUpdateForm from './components/manager/ProductUpdateForm';
import AddPoster from './components/manager/AddPoster';
import FacebookPixel from './components/FacebookPixel';



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
        path: "/order-details/:id",
        element: <OrderDetails />
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
        element: <Profile />,
        children: [
          {

            index: true,
            element: <UserDetail />
          },
          {
            path: '/user/profile/user-details',
            element: <UserDetail />
          },
          {
            path: '/user/profile/my-orders',
            element: <Myorder />
          },
          {
            path: '/user/profile/my-wishlist',
            element: <Mywishlist />
          },
          {
            path: "/user/profile/my-address",
            element: <MyAddress />
          },
          {
            path: "/user/profile/terms-of-use",
            element: <TermsOfUse />
          },
          {
            path: "/user/profile/privacy-and-policy",
            element: <Privacyandpolicy />
          }
        ]
      },
      {
        path: '/products/male',
        element: <MaleProducts />
      },
      {
        path: '/products/women',
        element: <WomenProducts />
      },
      {
        path: '/product/interests/culture',
        element: <CultureProducts />
      },
      {
        path: '/product/interests/movies',
        element: <MoviesProducts />
      },
      {
        path: "/product/interests/sports",
        element: <SportsProducts />
      },
      {
        path: "/product/interests/anime",
        element: <AnimeProducts />
      },
      {
        path: "/product/interests/music",
        element: <MusicProducts />
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
        path: "/manager/products/update-product/:id",
        element: <ProductUpdateForm />
      },
      {
        path: "/manager/poster/add-poster",
        element: <AddPoster />
      },
      {
        path: "/Manager/profile",
        element: <ManagerProfile />,

      },

    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <FacebookPixel />
      <UserProvider >
        <RouterProvider router={router} />
      </UserProvider>
    </HelmetProvider>
  </StrictMode>,
)
