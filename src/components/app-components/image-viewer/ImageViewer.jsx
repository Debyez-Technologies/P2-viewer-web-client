import { useState } from "react";

const ImageViewer = ({ close, img }) => {
    // State for zooming
    const [scale, setScale] = useState(1);

    // State for panning
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const handleImageViewerClose = () => {
        close();
    };

    // This is the key function to prevent the modal from closing when clicking inside its content
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    // --- Zoom Controls ---
    const zoomIn = () => setScale(prevScale => prevScale + 0.1);
    const zoomOut = () => setScale(prevScale => (prevScale > 0.2 ? prevScale - 0.1 : 0.1));

    // --- Pan Handlers ---
    const handleMouseDown = (e) => {
        if (scale <= 1) return; // Only allow panning when zoomed
        e.preventDefault();
        setIsPanning(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const newX = e.clientX - startPosition.x;
        const newY = e.clientY - startPosition.y;
        setPosition({ x: newX, y: newY });
    }; 

    const handleMouseUpOrLeave = () => {
        setIsPanning(false);
    };

    // --- Reset ---
    const resetImage = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const cursorStyle = scale > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default';

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center"
            onClick={handleImageViewerClose}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
        >
            <div
                className="relative bg-white p-4 rounded-lg shadow-xl overflow-hidden"
                onClick={handleContentClick} // This container stops the click from closing the modal
            >
                {/* --- CONTROLS --- */}
                {/* Moved inside the content container to prevent closing the modal */}
                {/* A z-index ensures they stay on top of the image */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
                    <button onClick={zoomIn} className="bg-gray-800 text-white font-bold text-lg rounded-full w-8 h-8 flex items-center justify-center shadow-md">+</button>
                    <button onClick={zoomOut} className="bg-gray-800 text-white font-bold text-lg rounded-full w-8 h-8 flex items-center justify-center shadow-md">-</button>
                    <button onClick={resetImage} className="bg-gray-800 text-white text-sm rounded-md px-3 py-1 shadow-md">Reset</button>
                </div>

                <img
                    {...img}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseUpOrLeave}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        cursor: cursorStyle,
                        transition: isPanning ? 'none' : 'transform 0.2s',
                        maxWidth: '80vw',
                        maxHeight: '80vh',
                    }}
                    draggable="false"
                />
            </div>
        </div>
    );
};

export default ImageViewer;