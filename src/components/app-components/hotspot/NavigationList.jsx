import React, { useEffect } from 'react'; // Don't forget to import React
import { useHotspotInteractionProvider } from '../../../../providers/HotspotInteractionProvider';
import { RiExternalLinkLine } from "react-icons/ri";
import { LuFileSymlink } from "react-icons/lu";


const NavigationList = () => {

    const { safeInternalNavigation, hotspotOnFocus, safeExternalNavigation } = useHotspotInteractionProvider()
    useEffect(() => {
        console.log("hotspot on focus", hotspotOnFocus)
    }, [hotspotOnFocus])

    return (
        <>
            {hotspotOnFocus && hotspotOnFocus.length > 0 ? (
                <div className="w-full max-w-2xl mx-auto"> {/* Use className for JSX */}
                    <div className="bg-white shadow-md rounded-lg">
                        <div className="grid grid-cols-3 bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <div className="py-3 px-6 text-left">Title</div>
                            <div className="py-3 px-6 text-left">Description</div>
                            <div className="py-3 px-6 text-left">Go to</div>
                        </div>
                        <div className="text-gray-600 text-sm font-light">
                            {hotspotOnFocus.map((hotspot, index) => ( // map over the array
                                <div className="grid grid-cols-3 border-b border-gray-200 hover:bg-gray-100" key={index}> {/* Add a unique key */}
                                    <div className="py-3 px-6 text-left">
                                        <span>{hotspot.targetTitle}</span> {/* Access hotspot.targetTitle */}
                                    </div>
                                    <div className="py-3 px-6 text-left">
                                        <span>{hotspot?.targetDescription || "Nothing to show"}</span>
                                    </div>
                                    <div className="py-3 px-6 text-left">
                                        {hotspot.linkType === "InternalRef" ?
                                            <span>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                    onClick={() => safeInternalNavigation(hotspot.targetId)}
                                                >
                                                    <LuFileSymlink />
                                                </button>
                                            </span> : <></>}
                                        {hotspot.linkType === "DmRef" ?
                                            <span>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                    onClick={() => safeExternalNavigation(hotspot.dmCode, hotspot.referredFragment)}
                                                >
                                                    <RiExternalLinkLine />
                                                </button>
                                            </span> : <></>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-4">No internal references to display.</p> // More descriptive message
            )}
        </>
    );
};

export default NavigationList