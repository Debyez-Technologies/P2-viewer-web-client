import { useEffect, useState } from "react";

const PopOver = ({ children, mouseX, mouseY }) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (mouseX !== undefined && mouseY !== undefined) {
            // Calculate position with offset and viewport boundaries
            const offset = 10;
            let x = mouseX + offset;
            let y = mouseY + offset;

            // Adjust position if it would go off-screen
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Estimate popover dimensions (you might want to measure the actual element)
            const estimatedWidth = 200;
            const estimatedHeight = 100;

            // Adjust X position if it would overflow
            if (x + estimatedWidth > viewportWidth) {
                x = mouseX - estimatedWidth - offset;
            }

            // Adjust Y position if it would overflow
            if (y + estimatedHeight > viewportHeight) {
                y = mouseY - estimatedHeight - offset;
            }

            // Ensure minimum distance from edges
            x = Math.max(8, x);
            y = Math.max(5, y);

            setPosition({ x, y });
        } else {
            setPosition(null);
        }
    }, [mouseX, mouseY]);

    // Only render when position is calculated
    if (!position) {
        return null;
    }

    return (
        <div 
            className="fixed z-50 text-gray-50 bg-gray-800 rounded shadow-lg border border-gray-600 max-w-xs"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                pointerEvents: 'none' // Prevent interfering with mouse events
            }}
        >
            {children}
        </div>
    );
};

export default PopOver;