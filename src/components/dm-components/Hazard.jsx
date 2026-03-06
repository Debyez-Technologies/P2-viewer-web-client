

function Hazard({ children, ...props }) {
  // A container for a single hazard statement.
  // Contains child components to describe the hazard.
  return <div className="hazard-statement" {...props}>{children}</div>;
}

export default Hazard;