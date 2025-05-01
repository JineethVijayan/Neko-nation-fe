import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';


const schema = yup.object({
    firstName: yup.string().required('please enter your first name'),
    lastName: yup.string().required('please enter your last name'),
    email: yup.string().required('please enter your email'),
    password: yup.string().min(4, 'Password must be at least 4 characters long.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.').required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
}).required();


const UserSignUp = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when the component mounts
        window.scrollTo(0, 0);
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

     const [showPassword, setShowPassword] = useState(false);
    
    
        const togglePasswordVisibility = () => {
            setShowPassword((prev) => !prev);
        };
    

    const onSubmit = async (data) => {
        try {

            const res = await axiosInstance.post('/user/signup', data);

            const resData = res.data;

            console.log(resData);

            if (resData === 'signed up successfully') {
                toast.success('Signed up successfully! Please log in.')

                navigate('/user/signin');
            }

        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                // Handle different status codes
                if (status === 401) {
                    toast.error('User already exists');
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
        <div className='pt-24 flex justify-center'>
            <div className='w-96'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full text-center p-6'>
                    <input type="text" {...register('firstName')} placeholder='First Name' className=' border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2' />
                    <p className='text-red-600'> {errors.firstName?.message} </p>
                    <input type="text" {...register('lastName')} placeholder='Last Name' className='mt-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2' />
                    {errors.lastName?.message}
                    <input type="email" {...register('email')} placeholder='Email' className='mt-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2' />
                    {errors.email?.message}
                   
                   
                    <div className='relative'>
                        <input type={showPassword ? "text":"password"} placeholder='Password' {...register('password')} className=' w-full mt-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2 pr-10' />

                        <button type="button" onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 top-5 flex items-center text-gray-600 ">
                            {showPassword ? <img src="../images/hide.png" className='w-4 h-4' alt="hide" /> : <img src="../images/view.png" className='w-4 h-4' alt="view" />}
                        </button>

                    </div>
                   
                    {errors.password?.message}
                    <input type="password" {...register('confirmPassword')} placeholder='Confirm Password' className='mt-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2' />
                    {errors.confirmPassword?.message}
                    <input type="submit" value="Sign Up" className='mt-6 px-2 py-1.5 w-24 ms-32 bg-[#ff7b00] text-white hover:bg-[#ffea00] hover:text-black rounded' />
                    <p className=' ms-16 mt-4'>
                        User already exist ?{" "}
                        <Link to="/user/signin" className="text-blue-500 underline ">
                            Signin
                        </Link>

                    </p>
                </form>
            </div>
        </div>
    )
}

export default UserSignUp
