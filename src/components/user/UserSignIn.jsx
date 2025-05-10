import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import axiosInstance from '../../config/axiosInstance';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';


const schema = yup.object({
    email: yup.string().email('Must be a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password')
}).required();


const UserSignIn = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when the component mounts
        window.scrollTo(0, 0);
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const { saveUser } = useUser();

    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    const onSubmit = async (data) => {
        try {

            const res = await axiosInstance.post('/user/signIn', data);
            const resData = await res.data;




            console.log(resData.user);

            if (resData.user) {
                saveUser(resData.user); // Save user in context and localStorage
            }
            const role = resData.role;
            console.log(role);

            if (role === 'user') {
                toast.success("Successfully loged in");
                navigate('/');
            } else if (role === 'manager') {
                toast.success("Successfully loged in");
                navigate('/manager/products');
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                // Handle different status codes
                if (status === 401) {
                    toast.error('Invalid email or password!');
                } else if (status === 403) {
                    toast.error('Access denied! You are not authorized.');
                } else if (status === 500) {
                    toast.error('Server error! Please try again later.');
                } else {
                    toast.error(data || 'Something went wrong!');
                }
            } else {
                toast.error('Network error! Please check your internet.');
            }

        }
    }

    return (
        <div className=' flex justify-center h-screen items-center'>
            <div className='w-96'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full p-6'>

                    <input type="email" placeholder='Email'{...register('email')} className='mb-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2' />
                    {errors.email?.message}

                    <div className='relative'>
                        <input type={showPassword ? "text":"password"} placeholder='Password' {...register('password')} className=' w-full mb-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2 pr-10' />

                        <button type="button" onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 bottom-5 flex items-center text-gray-600 ">
                            {showPassword ? <img src="../images/hide.png" className='w-4 h-4' alt="hide" /> : <img src="../images/view.png" className='w-4 h-4' alt="view" />}
                        </button>

                    </div>
                    {errors.password?.message}
                    <input type="submit" value="Sign In" className='px-2 py-1.5 w-24 ms-32 bg-[#ff7b00] text-white hover:bg-[#ffea00] hover:text-black rounded' />

                    <p className=' ms-16 mt-4'>
                        User not created yet ?{" "}
                        <Link to="/user/signup" className="text-blue-500 underline">
                            Signup
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default UserSignIn
