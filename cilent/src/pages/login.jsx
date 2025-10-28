import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Login = () => {
    const [state, setState] = useState("login");
    const navigate = useNavigate();
    const { setUser } = useAppContext();

    // state for input value
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // handle change input value
    const onChangeHandler = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    
    // handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = state === 'login' ? '/login' : '/register';
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                if (state === 'register') {
                    setState('login'); // Switch to login after successful registration
                    setData({ name: '', email: '', password: '' }); // Clear form
                } else {
                    // Handle successful login - set user state and redirect
                    console.log('Login successful:', result.user);
                    setUser(result.user); // Add this line to set user in context
                    navigate('/'); // Redirect to home page
                }
            } else {
                alert(result.message || "Auth failed");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    };

// ... rest of the component remains the same ...

return (
    // wrapper centers the form and makes it responsive
    <div className="min-h-screen flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm sm:w-[350px] text-center 
                   border border-zinc-300/60 dark:border-zinc-700 
                   rounded-2xl px-6 py-8 bg-white dark:bg-zinc-900"
            >
                <h1 className="text-zinc-900 dark:text-white text-3xl mt-2 font-medium">
                    {state === "login" ? "Login" : "Register"}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-4">
                    Please {state === "login" ? "sign in" : "sign up"} to continue
                </p>

                {state !== "login" && (
                    <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-4 gap-2">
                        {/* User Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-zinc-500 dark:text-zinc-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 21a8 8 0 0 0-16 0" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-4 gap-2">
                    {/* Mail Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-zinc-500 dark:text-zinc-400"
                        viewBox="0 0 24 24"
                    >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>

                    <input
                        type="email"
                        placeholder="Email id"
                        className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-4 gap-2">
                    {/* Lock Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-zinc-500 dark:text-zinc-400"
                        viewBox="0 0 24 24"
                    >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <div className="mt-4 text-left">
                    <button type="button" className="text-sm text-indigo-500 dark:text-indigo-400">
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
                >
                    {state === "login" ? "Login" : "Create Account"}
                </button>

                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-4">
                    {state === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        className="text-indigo-500 dark:text-indigo-400"
                        onClick={() => setState((prev) => (prev === "login" ? "register" : "login"))}
                    >
                        {state === "login" ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;