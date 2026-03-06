import { useUserStore } from '../store/user-store';

const WelcomeBar = () => {

    const userName = useUserStore((state) => state.userName);
    return (
    <div className="p-4 font-medium text-lg border-b shadow-sm rounded-md font-serif text-gray-700 flex items-center">
        <p>Welcome, {userName}</p>
    </div>
    );
};

export default WelcomeBar;