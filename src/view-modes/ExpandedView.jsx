import Toolbar from "../components/app-components/toolbar/Toolbar";
import MainContent from "../layout/MainContent";

function ExpandedView() {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* Toolbar (fixed at the top of this content area) */}
            <div className="flex-shrink-0"> {/* Use flex-shrink-0 to ensure it takes only its natural height */}
                <Toolbar />
            </div>

            {/* Main content - takes remaining vertical space, scrolls independently */}
            <div className="flex-1 m-2 overflow-y-auto text-xl">
                <MainContent />
            </div>
        </div>
    );
}

export default ExpandedView;