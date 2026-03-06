
import { useUIStore } from "../../../store/ui-store";
import Illustration from "./Illustration";
import { useHotspotStore } from "../../../store/hotspot-store";
import { useRef, useEffect } from "react";
import ControlOverlay from "../../ui-components/ControlOverlay";

const Controls = ({ props }) => {
    const { toggleHotspotView } = useUIStore();
    const { setSelected } = useHotspotStore();

    const handleBtnClick = () => {
        console.log("props been passed", props)
        toggleHotspotView()
        setSelected({
            ...props
        })

    }

    return <div className="flex space-x-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleBtnClick}>
            open in hotspotting mode
        </button>
    </div>
}



const HotspotWrapper = (props) => {
    const svgRef = useRef(null)
    const { hotspottingMode } = useUIStore()

    console.log(props.filename, "got the filename again")
    if (!hotspottingMode)
        return <ControlOverlay controlOptions={<Controls props={props} />}>
            <Illustration  {...props} ref={svgRef} />
        </ControlOverlay>
    else
        return <>
            <Illustration {...props} ref={svgRef} />
        </>

}

export default HotspotWrapper