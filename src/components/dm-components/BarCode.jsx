

function BarCode({ children, ...props }) {
  // Renders a container for barcode information.
  // Based on the S1000D schema, it contains a <barCodeSymbol> (rendered as a Symbol/img)
  // and metadata. The actual barcode value is in a metadata tag.
  
  return (
    <div className="barcode" {...props}>
      {children}
    </div>
  );
}

export default BarCode;