import React from 'react';

import {Link, useNavigate} from "react-router-dom";
import {axiosWithCookies, api_url} from "../../utils/requestUtils";

function Login() {
    const [userInfo, setUserInfo] = React.useState({
        email: "",
        password: ""
    });

    const [errorInfo, setErrorInfo] = React.useState("");

    const navigate = useNavigate();

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axiosWithCookies
            .post(api_url + "/auth/login", {
                email: userInfo.email,
                password: userInfo.password,
            })
            .then(function (response) {
                localStorage.setItem("FoodResQ_user", response.data.user);
                navigate("/");
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 401)
                        setErrorInfo(error.response.data.error);
                     else setErrorInfo("Server error: " + error.response.status);
                }
                else if (error.request) setErrorInfo("No response from server");
                else setErrorInfo("Error when setting up the request");

                setTimeout(() => {
                    setErrorInfo("");
                }, 5000);
            });
    }

    return (
        <div
            className="h-full bg-gray-50 brightness-95 sm:bg-auth-background bg-no-repeat bg-fixed bg-cover bg-left sm:bg-center">
            <div className="container h-full mx-auto flex flex-col items-center justify-center gap-10">
                <div className="text-gray-700 text-4xl">
                    <span>Food ResQ</span>
                </div>
                <form className="w-full max-w-xs md:max-w-md" onSubmit={login}>
                    {errorInfo ? (
                        <div className="my-3 text-red-600">{errorInfo}</div>
                    ) : <></>
                    }
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="email">Email</label>
                        <input
                            className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="email" type="text" placeholder="Email Address"
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    email: e.target.value
                                })}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="password">Password</label>
                        <input
                            className="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="password" type="password" placeholder="Password"
                            onChange={(e) =>
                                setUserInfo({
                                    ...userInfo,
                                    password: e.target.value
                                })}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-bold">
                            <span className="text-sm">Don't have an account? <Link className="underline" to={"/signup"}>Sign up.</Link></span>
                        </label>
                    </div>
                        <button
                            className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit">
                            Sign In
                        </button>
                </form>
            </div>
        </div>
    );
}

export default Login;