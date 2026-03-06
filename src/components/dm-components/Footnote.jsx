

function Footnote({ children, ...props }) {
  // Renders a footnote.
  // Contains text content, represented by children.
  return <div className="footnote" {...props}>{children}</div>;
}

export default Footnote;