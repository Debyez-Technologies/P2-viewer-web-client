

function SuperScript({ children, ...props }) {
  // Renders superscript text.
  // Contains text content.
  return <sup {...props}>{children}</sup>;
}

export default SuperScript;