import { create } from "zustand";

const useUIStore = create((set, get) => {

    return {
        expandViewState: false,
        bookmarkListState: false,
        floatingWindowState: false,
        bookmarkFormState: false,
        fullPublicationPrintRef: null,
        isPrinting: false,
        annotationManagerState: true,
        noteWindowState: false,
        expandViewState: false,
        hotspottingMode: false,
        isChatUiOpen: false,
        creds: null,
        isWireframeMode: false,
        selectedDashbtn: 'dashboard',
        isOpenRelatedSection: false,

        toggleFloatingWindowState: () => {
            const state = get().floatingWindowState
            set({
                floatingWindowState: !state
            })
        },
        toggleAnnotationManagerState: () => {
            const state = get().annotationManagerState
            set({
                annotationManagerState: !state
            })
        },

        toggleExpandedView: () => {
            const state = get().expandViewState;
            set({
                expandViewState: !state,
            });
        },

        toggleBookmarList: () => {
            const state = get().bookmarkListState
            set({
                bookmarkListState: !state
            })
        },

        toggleBookmarkForm: () => {
            const state = get().bookmarkFormState;
            set({
                bookmarkFormState: !state
            })
        },

        toggleNoteWindowState: () => {
            const state = get().noteWindowState
            set({
                noteWindowState: !state
            })
        },
        toggleHotspotView: () => {
            const state = get().hotspottingMode
            set({
                hotspottingMode: !state
            })
        },
        setCreds: (creds) => {
            set({
                creds: creds
            })
        },
        setIsWireframeMode: () => {
            const state = get().isWireframeMode
            set({
                isWireframeMode: !state
            })
        },
        toggleChatUi: () => {
            const state = get().isChatUiOpen
            set({
                isChatUiOpen: !state
            })
        },
        setSelectedDashbtn: (id) => {
            set({
                selectedDashbtn: id
            })
        },
        setIsOpenRelatedSection: (state) => {
            set({
                isOpenRelatedSection: state
            })
        },
        resetStore: () => {
            set({
                expandViewState: false,
                bookmarkListState: false,
                floatingWindowState: false,
                bookmarkFormState: false,
                fullPublicationPrintRef: null,
                isPrinting: false,
                annotationManagerState: true,
                noteWindowState: false,
                expandViewState: false,
                hotspottingMode: false,
                isChatUiOpen: false,
                creds: null,
                isWireframeMode: false,
                selectedDashbtn: 'dashboard',
                isOpenRelatedSection: false,
            })
        }
    }
})

export { useUIStore }