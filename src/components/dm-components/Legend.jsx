

function Legend({ children, ...props }) {
  // A legend, typically for a figure.
  // Can contain various descriptive components as children.
  return <div className="legend" {...props}>{children}</div>;
}

export default Legend;