

function EmbeddedSupplyDescr({ children, ...props }) {
  // Description of an embedded supply item.
  // Contains text and other components describing the supply.
  return <div className="embedded-supply" {...props}>{children}</div>;
}

export default EmbeddedSupplyDescr;