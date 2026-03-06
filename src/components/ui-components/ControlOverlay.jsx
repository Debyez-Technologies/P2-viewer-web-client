// No useState needed for a simple hover effect!
// import { useState } from "react";

const ControlOverlay = ({ children, controlOptions }) => {
    return (
        <div className="relative w-fit group">
            {/* 3. The Overlay Div */}
            {children}
            <div
                className="
                absolute inset-0 z-10 flex items-center justify-center
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                bg-black/50 
                "
            >
                {/* Your controls go inside the overlay */}
                {controlOptions}
            </div>
        </div>
    );
};

export default ControlOverlay