// src/components/ImageWithFallback.jsx
import React, { useState, useCallback } from 'react';
import { FaImage } from 'react-icons/fa'; // Import a placeholder icon

const ImageWithFallback = ({ src, alt, className, title, width, hieght }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback(() => {
        setHasError(true);
    }, []);

    if (hasError) {
        return (
            <div 
                title={title}
                className={`${className} flex items-center justify-center bg-gray-200 text-gray-500`}>
                <FaImage size={24} /> {/* Display the icon on error */}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={handleError}
            width={width}
            height={hieght}
        />
    );
};

export default ImageWithFallback;