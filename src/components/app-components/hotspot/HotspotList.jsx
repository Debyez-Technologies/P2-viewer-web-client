import { useEffect } from "react"
import { useHotspotStore } from "../../../store/hotspot-store"

const HotspotList = () => {
    const { hoveredHotspot } = useHotspotStore()
    useEffect(() => {
        console.log(hoveredHotspot, "Hotspot hovered")
    }, [hoveredHotspot])
    return <div class="w-full max-w-2xl mx-auto" >
        <div class="bg-white shadow-md rounded-lg">
            <div class="grid grid-cols-3 bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <div class="py-3 px-6 text-left">APS ID</div>
                <div class="py-3 px-6 text-left">Title</div>
                <div class="py-3 px-6 text-left">Description</div>
            </div>
            <div class="text-gray-600 text-sm font-light">
                {
                    hoveredHotspot ?
                        <div class="grid grid-cols-3 border-b border-gray-200 hover:bg-gray-100">
                            <div class="py-3 px-6 text-left">
                                <span>{hoveredHotspot.apsid}</span>
                            </div>
                            <div class="py-3 px-6 text-left">
                                <span>{hoveredHotspot.hotspotTitle}</span>
                            </div>
                        </div> : <div class="grid grid-cols-3 border-b border-gray-200 hover:bg-gray-100">
                            <div class="py-3 px-6 text-left">
                                <span>{"Hotspot Title"}</span>
                            </div>
                            <div class="py-3 px-6 text-left">
                                <span>{"hotspot"}</span>
                            </div>
                        </div>}

            </div>
        </div>
    </div>
}
export default HotspotList