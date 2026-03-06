import { create } from "zustand";
import { usePublicationStore } from "./publication-store";

function getLinkData(items) {
    console.log(typeof (items), "item type", items);

    let refs = []; // Initialize array
    try {

        if (!Array.isArray(items)) {
            console.warn("getInternalRefData: items is not an array.", items);
            return []; // Return empty array if not an array
        }

        for (const item of items) {

            if (item && item.props) {

                let refData = {
                    targetTitle: item.props?.targetTitle || null,
                    targetDescription: item.props?.targetDescription || null,
                }

                if (item.component === 'InternalRef') {
                    const internalRefInHotspot = {
                        linkType: 'InternalRef',
                        targetId: item.props.linkData.targetFragmentId
                    };

                    refs.push({ ...refData, ...internalRefInHotspot })

                } else if (item.component === 'DmRef') {

                    const dmRefInHotspot = {
                        linkType: 'DmRef',
                        dmCode: item.props.linkData.targetDmKey,
                        referredFragment: item.props.linkData.targetFragmentId || null,
                        targetTitle: item.text,
                    };

                    refs.push({ ...refData, ...dmRefInHotspot })
                } else {
                    console.warn("nothing found")
                }

            } else {
                console.warn("getInternalRefData: Item or its props are missing expected fields:", item);
            }
        }
    } catch (error) {
        console.error("Error in getInternalRefData:", error.message);
    }
    return refs; // Moved outside the loop
}

function findHotspots(items) {

    const hotspots = [];

    function traverse(currentItems) {

        if (!Array.isArray(currentItems)) {
            return;
        }

        for (const item of currentItems) {

            console.log("item ", item)

            let hotspot = {}

            if (item && typeof item === 'object' && item.component === "Hotspot") {
                console.log("hotspot item ", item)

                hotspot = {
                    hotspotId: item.props.id,
                    apsid: item.props.applicationStructureIdent,
                    hotspotTitle: item.props?.hotspotTitle || null,
                    hotspotDescription: item.props?.hotspotDescription || null,
                    links: []
                };

                if (item.children && item.children.length > 0) {

                    const refData = {
                        links: getLinkData(item.children),
                    };

                    console.log("hotspot identified", refData);
                    hotspots.push({ ...hotspot, ...refData });

                }

                if (item.children && item.children.length === 0) {
                    hotspots.push({ ...hotspot });
                }

            }

            if (item.children && Array.isArray(item.children)) {
                console.log("item to traverse again ", item)
                traverse(item.children);
            }

        }
    }
    traverse(items)
    return hotspots;
}

export const extractHotspots = () => {
    try {

        const currentDmData = usePublicationStore.getState().currentDmData;

        if (currentDmData.length === 0) {
            throw new Error("Couldn't fetch Data module Data")
        }

        const content = currentDmData.value.content;

        const hotspots = findHotspots(content.children); //children holds the data being rendered
        console.log("extractInternalLinks: found hotspots", hotspots);
        return hotspots;

    } catch (error) {
        console.error("Error in extractInternalLinks:", error.message);
        return [];
    }
};

const useHotspotStore = create((set, get) => ({
    selected: null,
    hotspots: [],
    hoveredHotspot: {},
    // internalRefIdData: [],
    internalLinks: [],
    hotspotMap: [],
    hotspotHome: null,


    setHotspot: () => {
        set({
            hotspots: extractHotspots(),
        })
    },

    // setInternalLinks: (dmCode) => {
    //     // This will trigger extractInternalLinks when setInternalLinks is called
    //     // Ensure you call setInternalLinks with your dmCode when your app loads
    //     set({
    //         internalLinks: extractInternalLinks()
    //     });
    // },

    removeHotspots: () => set({ hotspots: [] }),

    setSelected: (props) => set({ selected: props }),

    clearSelected: () => set({ selected: null }),

    setHotspotHovered: (apsid) => {
        const hoveredHotspot = get().hotspots.find(
            (hotspot) => hotspot.apsid === apsid
        );
        set({ hoveredHotspot: hoveredHotspot });
    },

    removeHotspotHovered: () => set({ hoveredHotspot: {} }),

    setHotspotHome: (key) => {
        set({
            hotspotHome: key
        })
    }
}));

export { useHotspotStore }