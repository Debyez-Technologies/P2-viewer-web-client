

function CaptionGroup({ children, ...props }) {
  // Renders a group of captions, typically in a grid or table-like layout.
  // The `cols` prop is important for styling the grid columns.
  // Based on the schema, its children will be <CaptionRow> components, as the
  // <captionBody> is a structural element and is processed transparently.
  
  // Example of how to use the 'cols' prop to set CSS grid columns.
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.cols || 1}, 1fr)`, // Default to 1 column if 'cols' is not provided
    border: '1px solid #555',
    borderRadius: '4px',
    margin: '1em 0',
  };

  return (
    <div className="caption-group" style={style} {...props}>
      {children}
    </div>
  );
}

export default CaptionGroup;