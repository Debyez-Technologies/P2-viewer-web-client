import React from 'react';
import { useUserStore } from '../store/user-store';

const WelcomeBar = () => {

    const userName = useUserStore((state) => state.userName);
    return (
    <div className="p-4 border-b shadow-sm rounded-md font-serif text-gray-700 h-full flex items-center">
        <p>Welcome, {userName}</p>
    </div>
    );
};

export default WelcomeBar;