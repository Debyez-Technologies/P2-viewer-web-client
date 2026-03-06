

function Caption({ children, ...props }) {
  // Renders a caption. This can be used for a table's main caption or,
  // in this new context, as a styled text block inside a CaptionEntry.
  // The 'color' and 'captionWidth' props from your XML can be used for styling.
  
  // Note: Using props directly for styling can be less performant than CSS classes,
  // but it's direct and works well for this demonstration.
  const style = {
    backgroundColor: props.color ? `var(--color-${props.color})` : 'transparent', // Assumes you have CSS variables for colors
    width: props.captionWidth || 'auto',
    textAlign: 'center',
    padding: '4px',
  };

  return (
    <div className="caption-element" style={style} {...props}>
      {children}
    </div>
  );
}

export default Caption;