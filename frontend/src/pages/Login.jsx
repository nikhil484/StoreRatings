import React from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-2">
                    StoreRatings
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Login to your account
                </p>

                {/* Form */}
                <form className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Login;
