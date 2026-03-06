

function EmbeddedSpareDescr({ children, ...props }) {
  // Description of an embedded spare part.
  // Contains text and other components describing the spare.
  return <div className="embedded-spare" {...props}>{children}</div>;
}

export default EmbeddedSpareDescr;