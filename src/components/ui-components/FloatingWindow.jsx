import React, { useState, useRef, useEffect } from 'react';
import { useUIStore } from '../../store/ui-store';
import { useAnnotationStore } from '../../store/annotation-store';

const FloatingWindow = ({ title = "Notes", isOpen, children }) => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const { toggleNoteWindowState } = useUIStore()
    const { setSelectedAnnotation } = useAnnotationStore();

    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleClose = () => {
        setIsVisible(false);
        toggleNoteWindowState(false)
        setSelectedAnnotation(null)
    };

    if (!isVisible) {
        return null;
    }

    useEffect(() => {
        if (!isOpen) {
            handleClose()
        }
    }, [isOpen])

    return (
        <div
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                width: '300px',
                minHeight: '150px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                zIndex: 1000,
                cursor: isDragging ? 'grabbing' : 'grab',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 100
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'grab',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                }}
                onMouseDown={handleMouseDown}
            >
                <span>{title}</span>
                <button
                    onClick={handleClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2em',
                        cursor: 'pointer',
                        color: '#555',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ddd'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'none'}
                >
                    &times;
                </button>
            </div>
            <div style={{ padding: '12px', flexGrow: 1 }}>
                {children}
            </div>
        </div>
    );
};

export default FloatingWindow;