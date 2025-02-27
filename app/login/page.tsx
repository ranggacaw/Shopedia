"use client"

import FollowMouse from '@/components/FollowMouse';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password
            });
    
            if (response.data) {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user)); // save user details
    
                setIsLoggedIn(true);
    
                Swal.fire({
                    title: "Login Success!",
                    icon: "success",
                    draggable: true
                });
    
                router.push('/');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred. Please try again.");
        }
    };
    

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-base-100">
                <FollowMouse />
                <div className="card w-96 bg-base-100 shadow-lg border border-base-200">
                    <div className="card-body">
                        <h2 className="font-logo text-2xl font-bold mb-4 text-gray-800">Shopedia</h2>
                        {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Email</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full bg-base-100 border-base-200"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-700">Password</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full bg-base-100 border-base-200"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">
                                    Login
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="/register" className="link link-primary">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
