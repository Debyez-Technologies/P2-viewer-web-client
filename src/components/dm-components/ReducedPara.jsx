

function ReducedPara({ children, ...props }) {
  // Renders a paragraph with a reduced set of allowed child elements, typically for front matter.
  // Functionally similar to a normal <Para>, but may have different styling context.
  
  return (
    <p className="reduced-para" {...props}>
      {children}
    </p>
  );
}

export default ReducedPara;