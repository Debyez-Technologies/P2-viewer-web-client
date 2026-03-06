import { useEffect, useState, useRef } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useAnnotationContext } from "../../../../providers/AnnotationProvider";
import { useUIStore } from "../../../store/ui-store";
import { useAnnotationStore } from "../../../store/annotation-store";
import { usePublicationStore } from "@/store/publication-store";

const PopUpTool = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const popUpRef = useRef(null); // Ref for the popup element
    const { addSelection, getSelectionInfo, clearSelection } = useAnnotationContext();
    const { annotationVisible } = useAnnotationStore();
    const { toggleNoteWindowState } = useUIStore()
    const { currentDMInfo } = usePublicationStore()

    const handleAnnotation = () => {
        try {
            const selectionInfo = getSelectionInfo();
            if (!!selectionInfo) {
                // This will add to the `highlights` from the context,
                // but won't trigger the fetch effect anymore.
                addSelection(currentDMInfo.id);
                toggleNoteWindowState(prev => !prev)
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const handleSelectionChange = () => {
            const currentSelection = window.getSelection();
            if (currentSelection && currentSelection.rangeCount > 0 && !currentSelection.isCollapsed) {
                // A selection exists and is not collapsed (i.e., not just a blinking cursor)
                setIsVisible(true);
                const range = currentSelection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                // console.log(rect, "position")

                // Calculate position to appear above the selection
                setPosition({
                    x: rect.left + window.scrollX + (rect.width / 2), // Center horizontally
                    y: rect.top + window.scrollY - 60 // 50px above the selection
                });
            } else {
                // No active selection, hide the popup
                setIsVisible(false);
                setPosition(null)
            }
        };

        const handleClickOutside = (event) => {
            // Hide the popup if a click occurs outside of it and there's no active selection
            if (popUpRef.current && !popUpRef.current.contains(event.target) && window.getSelection().isCollapsed) {
                setIsVisible(false);
                setPosition(null)
            }
        };

        if (annotationVisible) {
            document.addEventListener('selectionchange', handleSelectionChange);
            document.addEventListener('mousedown', handleClickOutside); // Use mousedown for quicker response
        } else {
            setIsVisible(false)
        }

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [annotationVisible]);

    return (
        <>
            {(annotationVisible && isVisible) && (
                <div
                    ref={popUpRef}
                    className="fixed flex flex-row bg-viewer-core rounded-lg shadow-lg z-50"
                    style={{
                        left: `${position?.x}px`,
                        top: `${position?.y}px`,
                        transform: 'translateX(-40%)' // Center the popup precisely
                    }}
                >
                    <button className="text-white text-xl p-2 hover:bg-purple-700 rounded-md" onClick={handleAnnotation}>
                        <HiOutlinePencilSquare />
                    </button>
                </div>
            )}
        </>
    );
};

export default PopUpTool;