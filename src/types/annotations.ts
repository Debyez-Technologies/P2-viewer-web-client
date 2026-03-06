import { MutableRefObject } from "react"

type Annotation = {
    id?: string
    highlightID: string
    dmID?: string
    userID?: string
    annotationData: string
    note?: string
    dmName?: string
}

type HightLightsType = {
    id: string
    annotationId: string
    text: string
    dmCode: string
    note: string
}

type AnnotationPayload = {
    highlighID: string
    text: string
    userID: string
    dmID: string
    note?: string
}

type NotesPayload = {
    annotationID: string
    dmID: string
    highlightID: string
    note: string
    userID: string
    annotationData: string
}

type SelectionInfoType = {
    range: Range
    text: string
}


interface AnnoationStore {
    annotationVisible: boolean
    selectedAnnotation: Annotation | null
    annotationList: Annotation[]


    toggleAnnotationVisible: () => void
    setSelectedAnnotation: (data: Annotation) => void
    createAnnotation: (userID: AnnotationPayload) => Promise<void>
    getAnnotationList: () => Promise<void>
    deleteAnnotationById: (id: string, userID: string) => Promise<void>
    addAnnotationNote: (data: NotesPayload) => Promise<void>
    resetStore: () => void
}

interface SelectionContextType<T> {
    containerRef: MutableRefObject<T>
    getSelectionInfo: () => SelectionInfoType | null
    clearSelection: () => void
}

interface AnnotationActionsContextType {
    addSelection: (dmID: string,
        customRange: Selection | null,
        customColor: string | null,
        customText: string | null,
        customID: string | null,
        newEntry: boolean) => Promise<AnnotationPayload>;

    highlightFirstOccurrence: (dmID: string, annotationID: string, textToFind: string, customColor: string | null) => Promise<AnnotationPayload | null>
    fetchAndHighlightAnnotations: () => void
    deleteAnnotation: (id: string) => void
}

interface HiglightManagerContextType {
    currentColor: string

    generateHighlightId: () => string
    highlights: HightLightsType[]
    setHighlights: React.Dispatch<React.SetStateAction<HightLightsType[]>>
    setCurrentColor: React.Dispatch<React.SetStateAction<string>>
    createHighlightElement: (highlightId: string, color: string, onClickHandler: (e: Event) => void) => HTMLSpanElement
    removeHighlight: (highlightId: string) => void
    hideAllHighlights: () => void
    updateHighlightColor: (highlightId: string, newColor: string) => void
    getHighlight: (highlihhtId: string) => HightLightsType
    highlightCount: number
}

export {
    AnnoationStore, AnnotationPayload, NotesPayload, Annotation,
    SelectionContextType, SelectionInfoType,
    HiglightManagerContextType, HightLightsType,
    AnnotationActionsContextType
}