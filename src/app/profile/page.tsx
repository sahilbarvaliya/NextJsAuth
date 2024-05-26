'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("");

  const getUserDetails = async () => {
    const res = await axios.post('/api/users/me');
    console.log(res.data)
    setData(res.data.user._id);
  }

  const logout = async () => {
    const res = await axios.get('/api/users/logout');

    if (res.data.success) {
      toast.success("logged out successfully");
      router.push('/login');
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen py-2'
    >
      <h1 className='text-6xl font-bold'>Profile Page</h1>
      <button
        onClick={getUserDetails}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Get User Details
      </button>
      <Link href={`/profile/${data}`}>
        <p className='text-blue-500 hover:underline mt-4'>Profile {data}</p>
      </Link>

      <p className='mt-4'>{data}</p>
      <button
        onClick={logout}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Logout
      </button>
      <Link href='/'>
        <p className='text-blue-500 hover:underline mt-4'>Home</p>
      </Link>
    </div>
  )
}

export default ProfilePage