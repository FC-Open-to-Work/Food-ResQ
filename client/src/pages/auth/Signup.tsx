import React from 'react';
import {Link} from "react-router-dom";

function Signup() {
    return (
        <div
            className="h-full bg-gray-50 brightness-95 sm:bg-auth-background bg-no-repeat bg-fixed bg-cover bg-left sm:bg-center">
            <div className="container h-full mx-auto flex flex-col items-center justify-center gap-10">
                <div className="text-gray-700 text-4xl">
                    <span>Food ResQ</span>
                </div>
                <form className="w-full max-w-xs md:max-w-md">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="username">Username</label>
                        <input
                            className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="username" type="text" placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="email">Email Address</label>
                        <input
                            className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="email" type="text" placeholder="Email Address"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="password">Password</label>
                        <input
                            className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="password" type="password" placeholder="Password"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="confirm-password">Confirm Password</label>
                        <input
                            className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="confirm-password" type="password" placeholder="Confirm Password"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-bold">
                            <span className="text-sm">Already have an account? <Link className="underline" to={"/login"}>Sign in.</Link></span>
                        </label>
                    </div>
                    <button
                        className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;