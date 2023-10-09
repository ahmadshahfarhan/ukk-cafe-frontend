import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import exampleImage from "./logokasir.png";
import "./loginpage.css"

export default function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoginAttempted, setIsLoginAttempted] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value.toLowerCase()}));
    }

    useEffect(() => {
        let errorTimer;
        if (errorMessage) {
            errorTimer = setTimeout(() => {
                setErrorMessage("");
            }, 2000); //ini detik proses pesan salah username dan password
        }

        let successTimer;
        if (showSuccessMessage) {
            successTimer = setTimeout(() => {
                setShowSuccessMessage(false);
                window.location.reload()
            }, 1000); // ini detik proses pesan login berhasil 
        }

        return () => {
            clearTimeout(errorTimer);
            clearTimeout(successTimer);
        };
    }, [errorMessage, showSuccessMessage, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoginAttempted(true);
        let data = {
            username: user.username,
            password: user.password
        }

        try {
            const result = await axios.post('http://localhost:8000/user/login', data);
            const userData = result.data.data[0];

            if (userData) {
                const role = userData.role;

                sessionStorage.setItem('nama_user', userData.nama_user);
                sessionStorage.setItem('token', result.data.token);
                sessionStorage.setItem('logged', result.data.logged);
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('id_user', userData.id);

                setShowSuccessMessage(true); // Menampilkan pesan sukses

                setErrorMessage(""); // Membersihkan pesan kesalahan

            } else {
                setErrorMessage("Username or password is incorrect.");
            }
        } catch (error) {
            setErrorMessage("Username or password is incorrect.");
        }
    }

    return (
        <section>
            {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="borderlogin">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text">
                            Sign in to your account
                        </h1>
                        {isLoginAttempted && errorMessage && <div className="text-red-500">{errorMessage}</div>}
                        {showSuccessMessage && <div className="text-green-500">Login successful. Redirecting...</div>}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-green">Username</label>
                                <input autoComplete="off" type="text" name="username" id="username" value={user.username} onChange={handleChange} className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-green">Password</label>
                                <input type="password" name="password" id="password" value={user.password} onChange={handleChange} className="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#7EB541] hover:bg-gray-700 focus:ring-gray-700">Sign in</button>
                        </form>
                    </div>
                </div>
            </div> */}


            <div class="login">
                <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div class="max-w-md mx-auto">
                            <div>
                                <h1 class="bg-white text-2xl font-semibold">Sign in to your account</h1>
                            </div>
                            <div class="divide-y divide-gray-200">
                                {isLoginAttempted && errorMessage && <div className="text-red-500">{errorMessage}</div>}
                                {showSuccessMessage && <div className="text-green-500">Login successful. Redirecting...</div>}
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg  sm:leading-7">
                                    <form onSubmit={handleLogin}>
                                        <div class="relative">
                                            <input autoComplete="off" type="text" name="username" id="username" value={user.username} onChange={handleChange} class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" required="" />
                                            <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                                        </div>
                                        <div class="relative">
                                            <input autoCapitalize="off" type="password" name="password" id="password" value={user.password} onChange={handleChange} class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" required="" />
                                            <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                        </div>
                                        <div class="relative">
                                            <button type="submit" class="mt-10 bg-gray-800 text-white rounded-md px-2 py-1">Sign in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
