

function Malfunction({ children, ...props }) {
  // Renders a block that identifies a failure from normal operation.
  // Based on the S1000D schema, its children are typically <Para> to describe the
  // malfunction, followed by a <RemedyAction>.
  
  const style = {
    border: '1px solid #ef4444',
    borderRadius: '4px',
    padding: '12px',
    margin: '10px 0',
    backgroundColor: '#4c2828'
  };

  return (
    <div className="malfunction" style={style} {...props}>
      <strong style={{ color: '#ef4444', display: 'block', marginBottom: '8px' }}>
        Malfunction
      </strong>
      {children}
    </div>
  );
}

export default Malfunction;