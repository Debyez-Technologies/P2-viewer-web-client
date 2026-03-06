

function Hotspot({ children, ...props }) {
  // An interactive area on a graphic.
  // This would typically be rendered as an SVG path or an HTML area element.
  // It is a child of a <Graphic> component.

  //Children need not to be rendered it is handled in hotspotting mode
  return <div className="hotspot" {...props}></div>;
}

export default Hotspot;