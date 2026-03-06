

function Quantity({ children, ...props }) {
  // Renders a quantity.
  // Contains text and potentially child elements like <QuantityValue>.
  return <span className="quantity" {...props}>{children}</span>;
}

export default Quantity;