import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHotspotStore } from "../src/store/hotspot-store";
import { useUIStore } from "../src/store/ui-store";
import { usePublicationStore } from "../src/store/publication-store";
import { usePopupToolProvider } from "./PopupProvider";

export const HotspotInteraction = createContext(null)

const useHotspotInteractionProvider = () => {
  const context = useContext(HotspotInteraction);

  if (!context) {
    throw new Error("useHotspotInteractionProvider must be used within a HotspotInteractionProvider");
  }
  return context;
};

const HotspotInteractionProvider = ({ children }) => {

  const mainContentRef = useRef(null);

  const { setHotspot, hotspots, removeHotspots, hoveredHotspot, hotspotHome, setHotspotHome } = useHotspotStore()
  const { setCurrentKey, currentKey } = usePublicationStore()
  const { hotspottingMode } = useUIStore()
  const { setPopupContent } = usePopupToolProvider()

  const [hotspotOnFocus, setHotspotOnFocus] = useState(null);
  const [toggleNavigator, setToggleNavigator] = useState(true);
  const [pendingApsid, setPendingApsid] = useState(null);

  // Add state to track pending navigation
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const getInternalRef = useCallback((apsid) => {
    if (hotspots.length === 0) {
      setPendingApsid(apsid);
      return;
    }
    processHotspot(apsid);
  }, [hotspots]);

  // Process pending requests when hotspots updates
  useEffect(() => {
    if (pendingApsid && hotspots.length > 0) {
      processHotspot(pendingApsid);
      setPendingApsid(null);
    }
  }, [hotspots, pendingApsid]);

  const processHotspot = useCallback((apsid) => {
    try {
      const foundLink = hotspots.find((hotspot) => hotspot.apsid === apsid);

      if (foundLink) {
        setHotspotOnFocus(foundLink.links);
      } else {
        console.warn(`No internal link found for hotspot APSID: ${apsid}`);
        setHotspotOnFocus(null);
        setToggleNavigator(false);
      }
    } catch (error) {
      console.error("Error in processHotspot:", error.message);
    }
  }, [hotspots]);

  const ScrollToTarget = (targetId) => {
    const blip = (element) => {
      element.style.transition = 'background-color 0.015s ease-in-out';
      element.style.backgroundColor = 'rgba(195, 217, 251, 0.5)';
      setTimeout(() => { element.style.backgroundColor = ''; }, 1000);
    }

    requestAnimationFrame(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        blip(element);
      }
    });
  };

  const navigateToInternalRef = useCallback((targetId) => {
    try {
      ScrollToTarget(targetId);
    } catch (error) {
      console.error(error.message);
    }
  }, [currentKey]);

  const navigateToDM = useCallback((key) => {
    try {
      setCurrentKey(key);
    } catch (error) {
      console.error("Couldn't navigate to dm", error);
    }
  }, []);

  const safeExternalNavigation = useCallback((dmCode, targetId) => {
    const isHome = () => {
      return dmCode === currentKey;
    }
    try {
      if (!isHome()) {
        // Set pending navigation and navigate to home
        setPendingNavigation(targetId);
        navigateToDM(dmCode);
      }

      if (!(targetId && targetId !== ('' || null || undefined))) {
        // Already at home, navigate directly
        navigateToInternalRef(targetId);
      }
    } catch (error) {
      console.log(error.message);
    }

  }, [currentKey])

  const safeInternalNavigation = useCallback((targetId) => {
    const isHome = () => {
      return hotspotHome === currentKey;
    }

    try {
      if (!isHome()) {
        setPendingNavigation(targetId);
        navigateToDM(hotspotHome);
      } else {
        if (targetId && targetId !== '') {
          navigateToInternalRef(targetId);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [currentKey, hotspotHome, navigateToDM, navigateToInternalRef]);

  // New useEffect to handle pending navigation after currentKey changes
  useEffect(() => {
    if (pendingNavigation && (hotspotHome === currentKey)) {
      // Use requestAnimationFrame for better timing with DOM updates
      requestAnimationFrame(() => {
        navigateToInternalRef(pendingNavigation);
        setPendingNavigation(null);
      });
    }
  }, [currentKey, pendingNavigation, hotspotHome, navigateToInternalRef]);

  useEffect(() => {
    if (hotspottingMode) {
      setHotspot();
      setHotspotHome(currentKey)
    } else {
      removeHotspots();
      setCurrentKey(hotspotHome)
      setHotspotHome('')
    }
  }, [hotspottingMode]);

  useEffect(() => {
    console.log("current Hotspot home", hotspotHome, "current page,", currentKey)
  }, [currentKey])

  useEffect(() => {
    if (hoveredHotspot) {
      setPopupContent(<div className="p-3 gap-1 flex flex-col">
        <h3>{hoveredHotspot.hotspotTitle}</h3>
        <p className="text-xs">{hoveredHotspot.hotspotDescription}</p>
      </div>)
    } else {
      setPopupContent(null)
    }
  }, [hoveredHotspot])

  const contextValues = {
    mainContentRef,
    getInternalRef,
    hotspotOnFocus,
    toggleNavigator,
    safeExternalNavigation,
    safeInternalNavigation,
    setToggleNavigator,
  };

  return (
    <HotspotInteraction.Provider value={contextValues}>
      {children}
    </HotspotInteraction.Provider>
  );
};

export { HotspotInteractionProvider, useHotspotInteractionProvider };