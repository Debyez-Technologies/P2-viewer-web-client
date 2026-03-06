
import { RiExpandDiagonalLine } from "react-icons/ri";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import BookmarkedIcon from "../../../assets/icons/bookmarked-icon.svg"
import { RiCloseCircleLine } from "react-icons/ri";

import { useUIStore } from "../../../store/ui-store";
import { useNavigate } from "react-router";
import { usePublicationStore } from "../../../store/publication-store";
import { useReactToPrint } from "react-to-print"; // 1. Import the print hook
import DMNavigation from "../topbar/DMNavigation";
import { useAnnotationStore } from "../../../store/annotation-store";
import { useAnnotationContext } from "../../../../providers/AnnotationProvider";
import { useHotspotInteractionProvider } from "../../../../providers/HotspotInteractionProvider";
import { useCallback, useMemo } from "react";
import { useBookmarkStore } from "../../../store/bookmark-store";
import { useAuthStore } from "@/store/auth";
import { Bookmark, House, Printer, SquarePen, Star, StarIcon } from "lucide-react";

const Tool = ({
    title,
    icon,
    onClick,
    buttonBehaviorClass = "",
    disable = false,
}) => {
    return (
        <div>
            <button
                onClick={onClick}
                title={title}
                className={`hover:text-viewer-core w-10 h-10 p-2.5 rounded-full items-center ${buttonBehaviorClass}`}
                disabled={disable}
            >
                {icon}
            </button>
        </div>
    );
};

const ToolsHotspotView = () => {
    const { toggleHotspotView } = useUIStore();
    const { setCurrentKey } = usePublicationStore();
    const { hotspotHome } = useHotspotInteractionProvider();

    const handleHotspotClose = useCallback(() => {
        toggleHotspotView();
        setCurrentKey(hotspotHome);
    }, [hotspotHome]);

    return (
        <div className={`flex flex-row gap-x-2 p-2 justify-end`}>
            <Tool
                title={"Hotspot mode"}
                icon={<RiCloseCircleLine />}
                onClick={handleHotspotClose}
            />
        </div>
    );
};

const ToolsExpandedView = () => {
    const { toggleExpandedView, expandViewState } = useUIStore();
    const ViewMode = expandViewState
        ? RiCollapseDiagonalLine
        : RiExpandDiagonalLine;

    return (
        <div className={`flex flex-row gap-x-2 p-2 justify-end`}>
            <DMNavigation
                textColor="text-icon-blue"
                borderColor="border-gray-600"
            />
            <Tool
                title={"Retracted View"}
                icon={<ViewMode className="w-6 h-6"/>}
                onClick={toggleExpandedView}
            />
        </div>
    );
};

const ToolsRetractedView = ({ printHandler }) => {
    const {
        toggleBookmarkForm,
        toggleBookmarList,
        toggleExpandedView,
        expandViewState,
        setSelectedDashbtn,
    } = useUIStore();

    const { toggleAnnotationVisible, annotationVisible } = useAnnotationStore();
    const { hideAllHighlights, clearSelection } = useAnnotationContext();
    const { bookmarkList } = useBookmarkStore();
    const { currentKey } = usePublicationStore();

    const navigate = useNavigate();
    const {currentUser} = useAuthStore()

    const isAdmin = currentUser?.roles?.some(role => role.isAdmin === true)
    const homePath = isAdmin ? "/publications" : "/"
    
    const handleHomeClick = () => {
        setSelectedDashbtn("dashboard");
        navigate(homePath);
    };

    const isBookmarked = useMemo(() => {

        
        if (!bookmarkList || bookmarkList.length <= 0)
            return false

        console.log(bookmarkList, currentKey, "checking")
        return bookmarkList.some(b => b.content.DmName === currentKey)
    }, [bookmarkList, currentKey])



    const ViewMode = expandViewState
        ? RiCollapseDiagonalLine
        : RiExpandDiagonalLine;

    console.log("is bookmarked", isBookmarked)
    return (
        <div className={`flex flex-row gap-x-2 justify-end`}>
            <Tool title={"Home"} icon={<House className="w-6 h-6"/>} onClick={handleHomeClick} />
            <Tool
                icon={<Printer  className="w-6 h-6" />}
                onClick={printHandler}
                title="Print Current View"
            />
            <Tool
                title={"Bookmark"}
                icon={<StarIcon/>} 
                className="w-6 h-6"
                onClick={toggleBookmarkForm}
                buttonBehaviorClass={
                    isBookmarked
                        ? `text-viewer-core`
                        : ``
                }
                disable={isBookmarked}
            />
            <Tool
                title={"List of bookmarks"}
                icon={<Bookmark className="w-6 h-6"/>}
                onClick={toggleBookmarList}
            />
            <Tool
                title={"Annotation"}
                icon={<SquarePen className="w-6 h-6"/>}
                onClick={async () => {
                    toggleAnnotationVisible();
                    // await getAnnotationList()
                    if (annotationVisible) {
                        hideAllHighlights();
                        clearSelection();
                    }
                }}
                buttonBehaviorClass={
                    annotationVisible
                        ? `text-lime-300`
                        : ``
                }
            />
            <Tool
                title={"Expanded view"}
                icon={<ViewMode className="w-6 h-6"/>}
                onClick={toggleExpandedView}
            />
            
        </div>
    );
};

const Toolbar = ({ componentToPrintRef }) => {
    const { expandViewState, hotspottingMode } = useUIStore();
    const { currentTitle } = usePublicationStore();

    const handlePrint = useReactToPrint({
        contentRef: componentToPrintRef,
        documentTitle: currentTitle || "Data Module",
        onAfterPrint: () => console.log("Single DM print job finished."),
    });

    if (expandViewState) return <ToolsExpandedView />;
    else if (hotspottingMode) return <ToolsHotspotView />;
    else return <ToolsRetractedView printHandler={handlePrint} />;
};

export default Toolbar;
