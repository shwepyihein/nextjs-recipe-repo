'use client';

import { registerUser } from '@/api/v1/auth/login';
import { ApiErrorResponse } from '@/types/apiTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { ApiError } from 'next/dist/server/api-utils';
import Link from 'next/link';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('password is required'),
});

const Page = () => {
  const [RegisterError, setRegisterError] = useState<ApiError>();
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await registerUser(data);

      const expiresIn = 60 * 60 * 24 * 5 * 1000;

      Cookies.set('accessToken', res.data.data.accesstoken, {
        expires: expiresIn,
      });
      navigate.push('/recipe');
      setLoading(false);
    } catch (error: unknown) {
      setRegisterError((error as ApiErrorResponse<any>).response?.data);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white w-[500px]  shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto  ">
            <form onSubmit={handleSubmit(handleRegister)}>
              <div>
                <h1 className="text-2xl font-semibold">Login Form</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="pt-2 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Name <span className="text-red-400">*</span>
                  </label>

                  <input
                    {...register('name')}
                    className={classNames(
                      'block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm'
                    )}
                    id="title"
                    placeholder="Bryan"
                  />
                  {errors.name && (
                    <p className="text-sm mt-3 px-2 text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>

                  <input
                    {...register('email')}
                    className={classNames(
                      'block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm'
                    )}
                    id="title"
                    type="email"
                    placeholder="admin@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-sm mt-3 px-2 text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="relative">
                    <label
                      htmlFor="Password"
                      className="block text-sm font-medium leading-6 text-gray-600"
                    >
                      Password <span className="text-red-400">*</span>
                    </label>

                    <input
                      {...register('password')}
                      className={classNames(
                        'block w-full  appearance-none rounded-md  bg-secondary-gray  px-3 py-3 placeholder-gray-400 shadow-sm sm:text-sm'
                      )}
                      id="password"
                      placeholder="12345678"
                    />
                    {errors.password && (
                      <p className="text-sm mt-3 px-2 text-red-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  {RegisterError && (
                    <p className="text-sm text-center mt-3 px-2 text-red-400">
                      {RegisterError.message}
                    </p>
                  )}
                  <div className="relative pt-3 text-center w-full">
                    <button
                      type="submit"
                      className="bg-blue-500 w-full text-sm  text-white rounded-md px-4 py-1"
                    >
                      {loading ? 'loading...' : 'Register with Email'}
                    </button>

                    <Link href="/login">
                      <p className=' text-blue-500 cursor-pointer w-full text-sm  mt-4  rounded-md px-4 pt-4"'>
                        login up with Email
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
