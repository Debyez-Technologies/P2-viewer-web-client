

function CaptionRow({ children, ...props }) {
  // Renders a row within a CaptionGroup.
  // This component acts as a direct child of a CSS Grid container.
  // We use `display: 'contents'` to make its children (<CaptionEntry>) 
  // participate directly in the parent's grid layout, spanning the full width.
  // Based on the schema, its children will be <CaptionEntry> components.
  
  const style = {
    display: 'contents', // This makes the row a "pass-through" for the grid layout
  };

  return (
    <div className="caption-row" style={style} {...props}>
      {children}
    </div>
  );
}

export default CaptionRow;