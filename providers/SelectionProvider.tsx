import { SelectionContextType, SelectionInfoType } from "@/types/annotations";
import { createContext, useCallback, useContext, useRef } from "react"

const SelectionContext = createContext<SelectionContextType<HTMLElement | null> | undefined>(undefined)

export const useSelectionContext = () => {
    const context = useContext(SelectionContext);
    if (context === undefined) {
        throw new Error("useSelectionContext must be used within a SelectionProvider");
    }
    return context;
};

export const SelectionProvider = ({ children }) => {
    const containerRef = useRef(null)


    const getSelectionInfo = useCallback((): SelectionInfoType | null => {
        try {
            const root = containerRef.current
            if (!root) {
                console.warn("Container ref is not yet available.");
                return null;
            }

            const selection = window.getSelection();

            if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
                return null;
            }

            const range = selection.getRangeAt(0)

            console.log("selected range", range)
            if (!root.contains(range.commonAncestorContainer)) {
                return null;
            }
            const text = selection.toString();
            console.log("selected text", text)

            return { range, text };

        } catch (error) {
            console.log(error.message)
            return null;
        }
    }, [])

    const clearSelection = useCallback(() : void => {
        window.getSelection().removeAllRanges();
    }, [])

    return (
        <SelectionContext.Provider value={{
            getSelectionInfo,
            clearSelection,
            containerRef
        }}>
            {children}
        </SelectionContext.Provider>
    )
}