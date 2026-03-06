import React, { createContext, useCallback, useContext, useRef, useState } from "react"
import { useSelectionContext } from "./SelectionProvider";
import { useAnnotationStore } from "../src/store/annotation-store";
import { HightLightsType, HiglightManagerContextType } from "@/types/annotations";

const HighlightManagerContext = createContext<HiglightManagerContextType | undefined>(undefined)

export const useHighlightManager = () => {
    const context = useContext(HighlightManagerContext);
    if (context === undefined) {
        throw new Error("useHighlightManager must be used within a HighlightManagerProvider");
    }
    return context;
};

export const HighlightManagerProvider = ({ children }) => {
    const [highlights, setHighlights] = useState<HightLightsType[]>([])
    const [currentColor, setCurrentColor] = useState('#ffeb3b')
    const { getAnnotationList } = useAnnotationStore()
    const { containerRef } = useSelectionContext()

    const generateHighlightId = useCallback((): string => {
        return `highlight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }, [])

    const createHighlightElement = useCallback((highlightId: string, color: string, onClickHandler: (e: Event) => void): HTMLSpanElement => {
        console.log("creating",highlightId)
        const highlightSpan = document.createElement('span')
        highlightSpan.setAttribute('data-highlight-id', highlightId);
        highlightSpan.className = 'annotation-highlight';
        highlightSpan.style.backgroundColor = color;
        highlightSpan.style.padding = '2px 2px'
        highlightSpan.style.cursor = 'pointer';
        highlightSpan.addEventListener('click', onClickHandler);
        return highlightSpan;
    }, [])

    const removeHighlight = useCallback((highlightId: string) => {
        const root = containerRef.current;
        if (!root) return;

        const highlightElement = root.querySelector(`[data-highlight-id="${highlightId}"]`);
        if (!highlightElement) return;

        const parent = highlightElement.parentNode;
        while (highlightElement.firstChild) {
            parent.insertBefore(highlightElement.firstChild, highlightElement);
        }
        parent.removeChild(highlightElement);
        parent.normalize();

        (async () => {
            try {
                await getAnnotationList()
            } catch (error) {
                console.log(error)
            }
        })()

    }, [getAnnotationList]);

    const hideAllHighlights = useCallback(() => {
        console.log("clearing...")
        const root = containerRef.current;
        if (!root) return;

        const highlightElements = root.querySelectorAll('.annotation-highlight');
        highlightElements.forEach(element => {
            const parent = element.parentNode;
            while (element.firstChild) {
                parent.insertBefore(element.firstChild, element);
            }
            parent.removeChild(element);
            parent.normalize();
        });

        // setHighlights([]);
    }, []);

    const updateHighlightColor = useCallback((highlightId: string, newColor: string) => {
        const root = containerRef.current;
        if (!root) return;

        const highlightElement: HTMLSpanElement = root.querySelector(`[data-highlight-id="${highlightId}"]`);
        if (highlightElement) {
            highlightElement.style.backgroundColor = newColor;
            setHighlights(prev => prev.map(h =>
                h.id === highlightId ? { ...h, color: newColor } : h
            ));
        }
    }, []);

    const getHighlight = useCallback((highlightId: string): HightLightsType => {
        return highlights.find(h => h.id === highlightId);
    }, [highlights]);

    return (
        <HighlightManagerContext.Provider value={{
            highlights,
            setHighlights,
            currentColor,
            setCurrentColor,
            generateHighlightId,
            createHighlightElement,
            removeHighlight,
            hideAllHighlights,
            updateHighlightColor,
            getHighlight,
            highlightCount: highlights.length
        }}>
            {children}
        </HighlightManagerContext.Provider>
    )
}