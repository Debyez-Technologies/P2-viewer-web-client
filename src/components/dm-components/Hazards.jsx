

function Hazards({ children, ...props }) {
  // A container for a group of hazard statements.
  // Based on the schema, child will be one or more <Hazard> components.
  return <div className="hazards-group" {...props}>{children}</div>;
}

export default Hazards;