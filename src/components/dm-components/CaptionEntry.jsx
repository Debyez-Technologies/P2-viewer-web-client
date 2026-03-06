

function CaptionEntry({ children, ...props }) {
  // Renders a single cell or entry within a CaptionRow.
  // It will contain the actual styled caption text.
  // Based on the schema, its child is typically a <Caption> component.
  
  const style = {
    padding: '8px',
    borderRight: '1px solid #444',
    borderBottom: '1px solid #444',
  };

  return (
    <div className="caption-entry" style={style} {...props}>
      {children}
    </div>
  );
}

export default CaptionEntry;