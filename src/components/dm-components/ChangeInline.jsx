

function ChangeInline({ children, ...props }) {
  // A generic inline element to denote a change.
  // Contains text or other inline components.
  return <span className="change-inline" {...props}>{children}</span>;
}

export default ChangeInline;