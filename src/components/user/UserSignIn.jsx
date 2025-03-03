import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import axiosInstance from '../../config/axiosInstance';
import { useUser } from '../../context/UserContext';


const schema = yup.object({
    email: yup.string().email('must be a valid email').required('please enter your email'),
    password: yup.string().required('please enter your password')
}).required();


const UserSignIn = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const { saveUser } = useUser();

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
                alert('successfully loged in ');
                navigate('/');
            } else if (role === 'manager') {
                alert('successfully loged in');
                navigate('/manager/products');
            }

        } catch (error) {
            console.log('error :', error);

        }
    }

    return (
        <div className=' flex justify-center h-screen items-center'>
            <div className='w-96'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full p-6'>

                    <input type="email" placeholder='Email'{...register('email')} className='mb-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2' />
                    {errors.email?.message}
                    <input type="password" placeholder='Password' {...register('password')} className='mb-6  border border-[#ff7b00] focus:border-[#ffea00] focus:outline-none focus:ring-1 focus:ring-[#ffc300] rounded p-2' />
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
