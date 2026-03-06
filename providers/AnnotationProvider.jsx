import { AnnotationActionsProvider, useAnnotationActions } from "./AnnotationActionsProvider"
import { HighlightManagerProvider, useHighlightManager } from "./HighlightManagerProvider"
import { SelectionProvider, useSelectionContext } from "./SelectionProvider"

export const AnnotationProvider = ({ children }) => {
    return (
        <SelectionProvider>
            <HighlightManagerProvider>
                <AnnotationActionsProvider>
                    {children}
                </AnnotationActionsProvider>
            </HighlightManagerProvider>
        </SelectionProvider>
    )
}

// 5. Convenience hook that combines all contexts
export const useAnnotationContext = () => {
    const selection = useSelectionContext()
    const highlightManager = useHighlightManager()
    const actions = useAnnotationActions()

    return {
        ...selection,
        ...highlightManager,
        ...actions
    }
}