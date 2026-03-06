

function WarningsAndCautions({ children, ...props }) {
  // A container for a group of warnings and cautions.
  // Based on the schema, children will be <Warning> and <Caution> components.
  return <div className="warnings-cautions-group" {...props}>{children}</div>;
}

export default WarningsAndCautions;