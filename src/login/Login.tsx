import { useCallback, useEffect, useState } from "react";
import LoginHero from "../assets/images/LoginHero";
import DebyezTitle from "../components/app-components/title-logo/DebyezTitle";
import { useNavigate } from "react-router";
import { useUIStore } from "../store/ui-store";
import { useUserStore } from "../store/user-store";
import { useAuthStore } from "../store/auth";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState("");
    const { login, isAuthenticated, isError } = useAuthStore()



    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")

        }
    }, [isAuthenticated]);


    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();

            // Reset error
            setLocalError("");

            const trimmedUsername = username.trim();
            const trimmedPassword = password.trim();

            if (!trimmedUsername) {
                setLocalError("Username must not be empty");
                return;
            }
            if (!trimmedPassword) {
                setLocalError("Password must not be empty");
                return;
            }


            try {
                const res = await login({
                    email: trimmedUsername,
                    password: trimmedPassword,
                });
            } catch (error) {
                setLocalError("Invalid username or password.");
            }
        },
        [username, password, login]
    );

    return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
        {/* Backdrop Card */}
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-10 flex flex-col items-center">
            
            {/* Logo + Title */}
            <div className="mb-10 flex flex-col items-center">
                <DebyezTitle textColor="black" />
            </div>

            {/* Form */}
            <form className="w-full max-w-md" onSubmit={handleLogin}>
                {localError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {localError}
                    </div>
                )}

                {/* Username */}
                <div className="mb-6">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                        User Name
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="User Name"
                    />
                </div>

                {/* Password */}
                <div className="mb-8">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                        />
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                /* eye-off */
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                /* eye */
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </span>
                    </div>
                </div>

                {isError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        Error logging in — incorrect credentials
                    </div>
                )}

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-viewer-core text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-viewer-core"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
);

};

export default Login;
