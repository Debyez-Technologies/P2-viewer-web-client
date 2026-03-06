import React, { createContext, useCallback, useContext, useRef, useState } from "react"
// import { fromRange, toRange } from 'xpath-range'

import { useUIStore } from "../src/store/ui-store";
import { usePublicationStore } from "../src/store/publication-store";
import { useAnnotationStore } from "../src/store/annotation-store";
import { useSelectionContext } from "./SelectionProvider";
import { useHighlightManager } from "./HighlightManagerProvider";
import { Annotation, AnnotationActionsContextType, AnnotationPayload } from "@/types/annotations";
import { useAuthStore } from "@/store/auth";

const AnnotationActionsContext = createContext<AnnotationActionsContextType | undefined>(undefined)

export const useAnnotationActions = () => {
    const context = useContext(AnnotationActionsContext);
    if (context === undefined) {
        throw new Error("useAnnotationActions must be used within an AnnotationActionsProvider");
    }
    return context;
};

export const AnnotationActionsProvider = ({ children }) => {
    const { getSelectionInfo, clearSelection, containerRef } = useSelectionContext()
    const {
        setHighlights,
        currentColor,
        generateHighlightId,
        createHighlightElement,
        removeHighlight,
    } = useHighlightManager()

    const { toggleNoteWindowState } = useUIStore()
    const currentUser = useAuthStore(s => s.currentUser)
    const currentKey = usePublicationStore(s => s.currentKey)
    const { setSelectedAnnotation, selectedAnnotation, createAnnotation, annotationList, getAnnotationList } = useAnnotationStore();
    // const highlightsLenRef = useRef(highlights.length)

    const fetchAndHighlightAnnotations = useCallback(async () => {

        try {
            const data = annotationList && annotationList.map((annotation => (
                {
                    id: annotation.highlightID,
                    annotationId: annotation.id,
                    text: annotation.annotationData,
                    dmCode: annotation.dmName,
                    note: annotation.note
                }
            )))
            const highlightConfigs = Array.isArray(data) ? data : []
            console.log("func: fetchAndHighlightAnnotations", highlightConfigs)
            setHighlights(highlightConfigs)

        } catch (error) {
            console.error(error.message)
        }
    }, [annotationList])

    const addSelection = useCallback(async (dmID : string, customRange = null,
        customColor = null,
        customText = null,
        customID = null,
        newEntry = true) => {

        console.log("range to add", customRange)
        console.log("DM ID",dmID)
        const root = containerRef.current
        if (!root) {
            console.warn("Container ref is not available");
            return null;
        }

        try {
            let range: Range, color: string, text: string, highlightId: string;

            if (!customRange) {

                const selectionInfo = getSelectionInfo()
                if (!selectionInfo) {
                    console.warn("No selection available");
                    return null;
                }

                range = selectionInfo.range;
                text = selectionInfo.text
                color = customColor || currentColor;
                highlightId = generateHighlightId();

            } else {

                range = customRange;
                text = customText;
                color = customColor || currentColor;
                highlightId = customID

            }


            const onClickHandler = (e) => {
                try {
                    e.stopPropagation();
                    toggleNoteWindowState()
                    const annotateData: Annotation = { highlightID: e.target.getAttribute('data-highlight-id'), annotationData: text, dmName: currentKey, id: customID }
                    setSelectedAnnotation(annotateData)
                } catch (error) {
                    console.error(error.message)
                }
            };

            const highlightSpan = createHighlightElement(highlightId, color, onClickHandler);
            const contents = range.extractContents();
            highlightSpan.appendChild(contents);
            range.insertNode(highlightSpan);

            const highlightInfo: AnnotationPayload = {
                highlighID: highlightId,
                text: text,
                userID: currentUser.id,
                dmID: dmID,
            };


            if (newEntry) {
                console.log("highlighted new ", highlightInfo)
                await createAnnotation(highlightInfo)
                await getAnnotationList()
                // await fetchAndHighlightAnnotations() // retrieves updated data from the database
                // commented bcz it fetched and highlighted first occurrence if other occurence are annotated at the same time.

                setSelectedAnnotation({
                    highlightID: highlightInfo.highlighID,
                    annotationData: highlightInfo.text,
                    dmName: currentKey, // Use dmCode for consistency as it's passed to Go
                    id: highlightInfo.highlighID
                });
                // toggleNoteWindowState();
            }


            clearSelection();
            return highlightInfo;

        } catch (error) {
            console.log('Error adding highlight:', error)
            return null;
        }
    }, [currentColor, generateHighlightId, getSelectionInfo, currentKey, clearSelection, createHighlightElement, setHighlights, containerRef, setSelectedAnnotation])


    const highlightFirstOccurrence = useCallback(async (dmID: string, annotationID: string, textToFind: string, customColor = null) => {

        console.log("text to find at ", currentKey, textToFind)
        const root = containerRef.current;
        if (!root || !textToFind || typeof textToFind !== 'string' || textToFind.trim() === '') {
            console.warn("Container not available or invalid text to find.");
            return
        }

        const color = customColor || currentColor;
        const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);

        let currentNode: Node;

        while (currentNode = treeWalker.nextNode()) {
            const prevHighlight: HTMLElement = currentNode.parentElement.closest('.annotation-highlight')

            if (prevHighlight && prevHighlight.innerHTML === textToFind) {
                console.log("detected", prevHighlight.innerText)
                return null
            }

            const nodeText = currentNode.nodeValue;
            const index = nodeText.indexOf(textToFind);
            try {
                if (index > -1) {
                    const range = document.createRange();
                    range.setStart(currentNode, index);
                    range.setEnd(currentNode, index + textToFind.length);

                    const highlightInfo = await addSelection(dmID, range, color, textToFind, annotationID, false);

                    console.log(`Highlighted the first occurrence of "${textToFind}".`);
                    return highlightInfo;
                }
            } catch (error) {
                console.error(error, "Error highlighting")
                return null
            }

        }

        console.log(`No matches found for "${textToFind}".`);
        return null;

    }, [currentColor, addSelection, containerRef]);

    const deleteAnnotation = useCallback(async (id: string) => {

        try {
            console.log(id, "annotation to delete")
            removeHighlight(id)
        } catch (error) {
            console.log(error.message)
        }
    }, [selectedAnnotation])

    return (
        <AnnotationActionsContext.Provider value={{
            addSelection,
            highlightFirstOccurrence,
            fetchAndHighlightAnnotations,
            deleteAnnotation,
            // highlightsLenRef
        }}>
            {children}
        </AnnotationActionsContext.Provider>
    )
}
