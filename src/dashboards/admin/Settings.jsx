import React, { useEffect, useState } from 'react';
import UserProfile from "../login/UserProfile"; // Assuming this path is correct
import { useUIStore } from '../store/ui-store';

// A simple reusable Foldable component (no changes here from previous version)
const Foldable = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { setSelectedDashbtn } = useUIStore()

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setSelectedDashbtn('settings')
    }, [])
    return (
        <div className="border border-gray-200 rounded-md mb-4 bg-white shadow-sm">
            <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={toggleOpen}
            >
                <h3 className="text-lg font-semibold">{title}</h3>
                <span>{isOpen ? '▲' : '▼'}</span> {/* Up/Down arrow for open/close */}
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const Settings = () => {
    // State for dummy form inputs
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');
    const [emailNotifications, setEmailNotifications] = useState(true);

    const handleSaveChanges = (section) => {
        alert(`Saving changes for ${section}!`);
        // In a real app, you would send this data to a backend
        console.log(`Changes for ${section}:`, { fullName, email, password, theme, emailNotifications });
    };

    return (
        <div className="flex flex-col gap-5 w-full p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

            {/* User Profile Foldable */}
            <Foldable title="User Profile" defaultOpen={true}>
                <UserProfile /> {/* Your existing UserProfile component */}
            </Foldable>
            {/* Appearance Foldable */}
            <Foldable title="Appearance">
                <form className="space-y-4">
                    <div>
                        <label htmlFor="themeSelect" className="block text-sm font-medium text-gray-700">Theme</label>
                        <select
                            id="themeSelect"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSaveChanges('Appearance')}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Apply Theme
                        </button>
                    </div>
                </form>
            </Foldable>

            {/* Notifications Foldable */}
            <Foldable title="Notifications">
                <form className="space-y-4">
                    <div className="flex items-center">
                        <input
                            id="emailNotifications"
                            name="emailNotifications"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                            Receive email notifications
                        </label>
                    </div>
                    <div>
                        <p className="block text-sm font-medium text-gray-700 mt-4">In-app Alerts</p>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                                <input id="alertComments" name="alertComments" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                <label htmlFor="alertComments" className="ml-2 block text-sm text-gray-900">Comments</label>
                            </div>
                            <div className="flex items-center">
                                <input id="alertMentions" name="alertMentions" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                                <label htmlFor="alertMentions" className="ml-2 block text-sm text-gray-900">Mentions</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSaveChanges('Notifications')}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </Foldable>

            {/* Privacy & Security (Dummy, just for structure) */}
            <Foldable title="Privacy & Security">
                <p className="text-gray-700">Content for privacy and security settings will go here.</p>
                <p className="text-gray-600 text-sm">E.g., Two-factor authentication, data export, connected apps.</p>
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Learn More
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete Account
                    </button>
                </div>
            </Foldable>
        </div>
    );
};

export default Settings;