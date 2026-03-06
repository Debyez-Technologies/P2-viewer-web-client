import { useUIStore } from "../../../store/ui-store";

import { HiCubeTransparent } from "react-icons/hi2";
const ControlPanel = ({ orbits, setSelectedOrbit, selectedOrbit, wireFrame, exit }) => {

    const { isWireframeMode, setIsWireframeMode } = useUIStore()
    return <div className=" absolute max-w-32 top-1/3 gap-3 z-20 justify-center rounded-md shadow-sm bg-gray-100 flex flex-col p-4">
        <button
            // Apply text-2xl here too
            className={`rounded-md text-2xl p-2 flex items-center justify-center ${isWireframeMode ? 'border border-blue-500 text-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setIsWireframeMode()}
        >
            <HiCubeTransparent />
        </button>
        {
            orbits.map((orbit, index) => {
                return <button
                    title={orbit.name}
                    // Apply text-2xl to make icons a consistent size
                    className={`${selectedOrbit === index ? `border rounded-md border-icon-blue` : ``} text-2xl p-2 flex items-center justify-center`}
                    key={index}
                    onClick={() => setSelectedOrbit(index)}
                >{orbit.icon}</button>
            })
        }
    </div>
}

export default ControlPanel;