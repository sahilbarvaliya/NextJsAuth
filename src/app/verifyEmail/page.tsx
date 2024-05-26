'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);

    const verifyEmail = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/verifyEmail", { token });
            console.log(response.data);
            setVerified(true);
            setError("");
        }
        catch (error: any) {
            console.log(error);
            setError("Error verifying email " + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        if (token) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen py-2'
        >
            <h1 className='text-4xl'>
                {loading ? "Loading..." : "Verify Email"}
            </h1>
            <h2>
                {token}
            </h2>
            {error && <p>{error}</p>}
            {verified && (<><p>Email verified successfully</p><Link href="/login">Login</Link></>)}
        </div>
    )
}

export default VerifyEmailPage  