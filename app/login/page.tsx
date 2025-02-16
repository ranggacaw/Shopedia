// components/Login.tsx
import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="card w-96 bg-base-100 shadow-lg border border-base-200">
                <div className="card-body">
                    <h2 className="font-logo text-2xl font-bold mb-4 text-gray-800">Pelerpedia</h2>
                    <form className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700">Email</span>
                            </label>
                            <input
                                type="email"
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
    );
};

export default Login;