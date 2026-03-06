import RetractedView from "./view-modes/RetractedView";
import ExpandedView from "./view-modes/ExpandedView";
import { usePublicationStore } from "./store/publication-store";
import { useUIStore } from "./store/ui-store";
import { AnnotationProvider } from "../providers/AnnotationProvider";

import HotspotMode from "./view-modes/HotspotMode";
import { HotspotInteractionProvider } from "../providers/HotspotInteractionProvider";
import { PopupToolProvider } from "../providers/PopupProvider";
import { useHotspotStore } from "./store/hotspot-store";
import { useEffect } from "react";
import AuthProvider from "./login/auth-provider";
import { useAuthStore } from "./store/auth";

function IETMViewer() {
    const { expandViewState, hotspottingMode } = useUIStore();
    const { hotspotHome } = useHotspotStore();

    const { setCurrentKey } = usePublicationStore();

    useEffect(() => {
        if (hotspottingMode) setCurrentKey(hotspotHome);
    }, [hotspottingMode]);

    if (!hotspottingMode)
        return <>{expandViewState ? <ExpandedView /> : <RetractedView />}</>;
    else
        return (
            <HotspotInteractionProvider>
                <HotspotMode />
            </HotspotInteractionProvider>
        );
}

const RenderView = () => {
    return (
            <PopupToolProvider>
                <IETMViewer />
            </PopupToolProvider>
    );
};

export default RenderView;
