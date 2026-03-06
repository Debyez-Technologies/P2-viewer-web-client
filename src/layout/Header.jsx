import DMNavigation from "../components/app-components/topbar/DMNavigation";
import TitleLogo from "../components/app-components/title-logo/TitleLogo";
import SearchBar from "../components/app-components/topbar/SearchBar";
import TopbarTools from "../components/app-components/topbar/TopbarTools";
import { useNavigate } from "react-router";
import { usePublicationStore } from "../store/publication-store";
import AppTitle from "@/components/app-components/title-logo/DebyezTitle";

// Toolbar is not used in this component, so it's commented out
// import Toolbar from '../components/app-components/toolbar/Toolbar' 
// import { ValidationComponent } from "../components/app-components/validation/validationComponent";

const Header = () => {
    const resetPublicationData = usePublicationStore((state) => state.resetPublicationData)
    const navigate = useNavigate();

    const resetToHome = () => {
        resetPublicationData();
        navigate('/')
    }

    return (
        <div className="border-viewer-core border-b">
            <header className="w-full p-3">
                <div className="flex justify-between items-center gap-4"> {/* Main flex container for the 3 items */}
                    <div className="cursor-pointer" onClick={resetToHome}>
                        <AppTitle textColor="gray-900" />
                    </div>
                    <div className="flex flex-row"> {/* Item 2: SearchBar wrapper to allow stretching */}
                        <SearchBar type={'local'} />
                        <DMNavigation textColor="text-viewer-core border-viewer-core" /> {/* Item 3 */}
                    </div>
                    {/* <TopbarTools /> */}
                </div>
            </header>
        </div>
    );
};

export default Header;