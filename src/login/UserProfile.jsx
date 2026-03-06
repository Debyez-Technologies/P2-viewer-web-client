import { useCallback, useEffect, useState } from "react";
import { useUIStore } from "../store/ui-store";

const UserProfile = () => {

    const [errMessage, setErrMessage] = useState("")
    const [isError, setIsError] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [onSuccess, setOnSuccess] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const { creds } = useUIStore()

    // Handle form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            console.log(creds, "current userdata")
            // Assuming FetchCredentials is also used for updating, or you have a separate update function.
            // If FetchCredentials is just for fetching, you'll need to define an UpdateCredentials in your Go backend.
            // For now, let's assume `FetchCredentials` can also be used to update.
            // You might want to add error handling for the backend call.
            // const updated = await FetchCredentials(username); // Adjust this call based on your Go function signature

            // Assuming 'updated' contains the new credentials or a success indicator
            // Then update the UI store with the new credentials

            setIsError(false);
            setOnSuccess(true)
            setTimeout(() => setOnSuccess(false), 4000)
            setErrMessage("");
            // Optionally, show a success message
            // alert("Credentials updated successfully!");

        } catch (error) {
            console.error("Failed to update credentials:", error);
            setIsError(true);
            setOnSuccess(false)
            setErrMessage("Failed to update credentials. Please try again.");
        }
    }, [creds, username, password])

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    return <div>
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-8">
                Change your current username or password
            </p>

            {/* Error Message */}
            {isError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {errMessage}
                </div>
            )}

            {onSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Successfully updated
                </div>
            )}

            {/* User Name Input */}
            <div className="mb-6">
                <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                >
                    User Name
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
                    placeholder="User Name"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            {/* Password Input */}
            <div className="mb-8">
                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Eye icon for show/hide password */}
                    <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                    clipRule="evenodd"
                                />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                    fillRule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </span>
                </div>
            </div>

            {/* Login Button */}
            <div className="flex justify-end space-x-3 mt-4">
                <button
                    type="submit"
                    className=" bg-viewer-core text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                >
                    Change
                </button>
            </div>

        </form>
    </div>
}

export default UserProfile;