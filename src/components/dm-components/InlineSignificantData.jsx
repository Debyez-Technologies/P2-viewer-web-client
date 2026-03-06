

function InlineSignificantData({ children, ...props }) {
  // Generic component for inline significant data.
  // Usually rendered with distinct styling.
  return <strong {...props}>{children}</strong>;
}

export default InlineSignificantData;