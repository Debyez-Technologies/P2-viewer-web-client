

function SpareDescr({ children, ...props }) {
  // Description of a spare part.
  // Contains text and other components describing the spare.
  return <div className="spare-descr" {...props}>{children}</div>;
}

export default SpareDescr;