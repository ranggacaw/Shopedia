"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            Swal.fire("Error", "Please enter a valid email address", "error");
            return;
        }
    
        if (password.length < 5) {
            Swal.fire("Error", "Password must be at least 5 characters long", "error");
            return;
        }

        try {
            // Register ke backend
            await axios.post("http://localhost:3001/auth/register", {
                email,
                username,
                password,
            });
    
            Swal.fire("Success", "Registration successful! Please login.", "success");
            router.push("/login");
    
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center mb-4">Create an Account</h2>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="link link-primary">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;