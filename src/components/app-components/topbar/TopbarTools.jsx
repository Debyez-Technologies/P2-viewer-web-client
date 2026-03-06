import { IoSettings } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router";

const TopbarTools = () => {
    const navigate = useNavigate()
    const handleSettingsNavigation = () => {
        navigate('/dashboard/settings')
    }
    return (
        <div className="flex space-x-3 items-center">
            <button
                className="border-2 border-gray-200 text-gray-200 w-10 h-10 rounded-full flex items-center justify-center"
                onClick={handleSettingsNavigation}
            >
                <IoSettings />
            </button>
        </div>
    );
}

export default TopbarTools