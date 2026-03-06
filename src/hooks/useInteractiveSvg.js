import { useCallback, useRef } from "react";
import { useHotspotInteractionProvider } from "../../providers/HotspotInteractionProvider";
import { useHotspotStore } from "../store/hotspot-store";
import { usePopupToolProvider } from "../../providers/PopupProvider";

const useInteractiveSvg = () => {
    const svgRef = useRef(null);
    const cleanupRef = useRef(null);

    const { setHotspotHovered, removeHotspotHovered } = useHotspotStore();
    const { getInternalRef } = useHotspotInteractionProvider();
    const { setPopupPosition } = usePopupToolProvider();

    const applyInteractivity = useCallback((svgElement) => {
        if (!svgElement) {
            console.warn("⚠️ No SVG element found for interactivity.");
            return;
        }

        const rects = svgElement.querySelectorAll("rect");
        if (!rects.length) {
            console.warn("⚠️ No <rect> elements found in SVG.");
            return;
        }

        console.log("🟢 Found rects:", rects.length);
        const listeners = [];

        rects.forEach((rect) => {
            const defaultStroke = rect.style.stroke;

            const onEnter = (event) => {
                rect.style.stroke = "rgb(0,0,225)";
                setPopupPosition({ x: event.clientX + 5, y: event.clientY - 50 });
                setHotspotHovered(rect.getAttribute("data-apsid"));
            };

            const onLeave = () => {
                rect.style.stroke = defaultStroke;
                removeHotspotHovered();
                setPopupPosition(null);
            };

            const onClick = () => {
                const apsid = rect.getAttribute("data-apsid");
                console.log("🟡 Clicked:", apsid);
                getInternalRef(apsid);
            };

            rect.addEventListener("mouseenter", onEnter);
            rect.addEventListener("mouseleave", onLeave);
            rect.addEventListener("click", onClick);

            listeners.push({ rect, event: "mouseenter", handler: onEnter });
            listeners.push({ rect, event: "mouseleave", handler: onLeave });
            listeners.push({ rect, event: "click", handler: onClick });
        });

        cleanupRef.current = () => {
            listeners.forEach(({ rect, event, handler }) => {
                rect.removeEventListener(event, handler);
            });
        };
    }, []);

    const setSvg = useCallback((svgElement) => {
        if (cleanupRef.current) cleanupRef.current();
        svgRef.current = svgElement;
        applyInteractivity(svgElement);
    }, [applyInteractivity]);

    return { setSvg, svgRef };
};


export { useInteractiveSvg }