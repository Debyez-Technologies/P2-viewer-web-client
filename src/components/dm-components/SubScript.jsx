

function SubScript({ children, ...props }) {
  // Renders subscript text.
  // Contains text content.
  return <sub {...props}>{children}</sub>;
}

export default SubScript;