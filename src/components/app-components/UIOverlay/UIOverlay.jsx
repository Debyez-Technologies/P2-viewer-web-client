const UIOverlay = ({ children }) => {
    return (
        <div className="fixed inset-0 pointer-events-none">
            <div className={`fixed top-1/4 right-5 z-51`}>
                {children}
            </div>
        </div>
    );
};

export default UIOverlay