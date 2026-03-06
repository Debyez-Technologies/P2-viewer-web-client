

function ProductAndModel({ children, ...props }) {
  // Renders a container for product and model names and their identifiers.
  // The child elements <productName> and <productModel> are structural, so this
  // component will receive their processed children (eg, <name>, <identNumber>).
  
  const style = {
    marginTop: '20px',
    fontSize: '1.1em',
  };

  return (
    <div className="product-and-model" style={style} {...props}>
      {children}
    </div>
  );
}

export default ProductAndModel;