import { useEffect, useState } from "react";
import { usePublicationStore } from "../../../store/publication-store";
import { useUIStore } from "../../../store/ui-store";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DMNavigation = () => {
    // Select multiple state values and actions from the hook
    const { currentKey, activeKey, setCurrentKey, currentTitle, getFilteredOrderedKeys, setCurrentTitle } = usePublicationStore();
    const { setIsOpenRelatedSection } = useUIStore();
    const [isNavEnd, setIsNavEnd] = useState(false)
    // Call the derived state function to get the ordered keys
    const orderedKeys = getFilteredOrderedKeys();
    const currentKeyIndex = orderedKeys.indexOf(activeKey);

    useEffect(() => {
        setCurrentTitle(currentKey);
    }, [currentKey])


    const handlePrevious = () => {
        if (currentKeyIndex > 0) {
            setCurrentKey(orderedKeys[currentKeyIndex - 1]);
        }
    };

    const handleNext = () => {
        if (currentKeyIndex < orderedKeys.length - 1) {
            setCurrentKey(orderedKeys[currentKeyIndex + 1]);
        }
    };

    useEffect(() => {
        if (currentKeyIndex >= orderedKeys.length - 1) {
            console.log("End of nav");
            setIsNavEnd(true)
        } else {
            setIsNavEnd(false)
        }
    }, [currentKeyIndex, orderedKeys])



    const buttonClassName = `flex items-center justify-center hover:text-viewer-core disabled:text-gray-300`
    return (
        <div className="flex space-x-3 items-center">
            <button className={buttonClassName} onClick={handlePrevious} disabled={currentKeyIndex <= 0}>
                <ChevronLeft />
            </button>
            <button className={buttonClassName} onClick={!isNavEnd ? handleNext : () => setIsOpenRelatedSection(true)} >
                <ChevronRight />
            </button>
        </div>
    );
}
export default DMNavigation;