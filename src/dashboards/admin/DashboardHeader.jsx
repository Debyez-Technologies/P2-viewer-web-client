import HeaderLayout from "../layout/HeaderLayout";
import TitleLogo from "../components/app-components/title-logo/TitleLogo";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router";

/**
 * The specific header used on the Project Dashboard.
 * It uses the common layout but only includes the title and logo.
 */
const DashboardHeader = () => {
  const navigate = useNavigate()
  return (
    <HeaderLayout>
      {/* This header only contains the TitleLogo */}
      <div className="flex items-center">
        <TitleLogo />
      </div>
      {/* An empty div can be used to balance the flexbox if needed, or add other controls later */}
      <div>
        <button className="w-15 h-15 border-2 border-gray-200 rounded-full p-2 text-gray-200" onClick={() => navigate('/appdashboard')}>
        <IoHome size={22}/>
      </button>
    </div>
    </HeaderLayout >
  );
};

export default DashboardHeader;