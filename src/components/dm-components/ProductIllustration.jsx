

function ProductIllustration({ children, ...props }) {
  // Renders a container for a product illustration on the title page.
  // Based on the S1000D schema, its child is a <graphic> element.
  
  const style = {
    margin: '2em 0',
    maxWidth: '60%',
  };
  
  return (
    <div className="product-illustration" style={style} {...props}>
      {children}
    </div>
  );
}

export default ProductIllustration;