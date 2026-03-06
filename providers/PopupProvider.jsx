import { createContext, useContext, useEffect, useState } from "react"
import { useHotspotStore } from "../src/store/hotspot-store"
import { useHotspotInteractionProvider } from "./HotspotInteractionProvider"
import PopOver from "../src/components/ui-components/PopOver"

const PopupTool = createContext(null)

const usePopupToolProvider = () => {
    const context = useContext(PopupTool)

    if (!context) {
        throw new Error("usePopupToolProvier must only be used in PopupToolProvider")
    }
    return context
}

const PopupToolProvider = ({ children }) => {
    const [popupContent, setPopupContent] = useState(null)
    const [popPosition, setPopupPosition] = useState(null)

    const contextValues = {
        setPopupContent,
        setPopupPosition
    }

    useEffect(() => { },)
    return <PopupTool.Provider value={contextValues}>
        <>
            {children}
        </>
        {(popupContent && popPosition) && <PopOver mouseX={popPosition.x} mouseY={popPosition.y}>
            {popupContent}
        </PopOver>}
    </PopupTool.Provider>
}

export { usePopupToolProvider, PopupToolProvider }