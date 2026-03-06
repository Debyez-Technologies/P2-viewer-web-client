const Overlay = ({ opacity = 90, bgColor = `black`, children }) => {

    return <div className={`absolute inset-0 bg-${bgColor} opacity-${opacity} z-10 pointer-events-none`}>
        {children}
    </div>
}

export default Overlay;