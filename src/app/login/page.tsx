'use client';
import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("login up successfully");
      router.push("/profile");
    }
    catch (error: any) {
      console.log(error);
      toast.error("Error signing up " + error.message);
    }
  }

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1>
        {loading ? "Loading..." : "Login"}
      </h1>

      <label className='m-2'>Email</label>
      <input
        type="email"
        className='p-2 m-2 border border-gray-300 rounded-md text-black'
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label className='m-2'>Password</label>
      <input
        type="password"
        className='p-2 m-2 border border-gray-300 rounded-md text-black'
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        disabled={buttonDisabled}
        onClick={onLogin}
        className='px-4 py-2 m-2  bg-blue-500 text-white rounded-md'
      >
        {
          buttonDisabled ? "Please fill all fields" : "Signup"
        }
      </button>
      <Link href="/signup">
        <p className='m-2'>
          Don&apos;t have an account? Signup
        </p>
      </Link>
    </div>
  )
}

export default LoginPage