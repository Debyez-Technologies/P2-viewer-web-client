

function Threshold({ children, ...props }) {
  // Renders limit information, such as a time or operational value before
  // an inspection must be performed.
  // Based on the S1000D schema, its children are <thresholdValue> and <tolerance>.
  
  return (
    <div className="threshold" {...props}>
      <strong>Threshold: </strong>
      {children}
    </div>
  );
}

export default Threshold;