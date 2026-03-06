

function ProductIntroName({ children, ...props }) {
  // Renders the introductory name of the product or project on the title page.
  // Its child <name> is structural, so this receives the text content directly.
  
  const style = {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '0.5em',
  };

  return (
    <h1 className="product-intro-name" style={style} {...props}>
      {children}
    </h1>
  );
}

export default ProductIntroName;