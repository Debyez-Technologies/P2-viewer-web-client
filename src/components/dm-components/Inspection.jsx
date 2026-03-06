import React from 'react';

function Inspection({ children, ...props }) {
  // Renders a container for inspection limit information and associated remarks.
  // Based on the S1000D schema, it groups <limit> (structural) and <remarks> children.
  
  const style = {
    padding: '12px',
    margin: '1em 0',
    border: '1px solid #4a5568',
    borderRadius: '4px',
  };

  return (
    <div className="inspection" style={style} {...props}>
      <h4>Inspection Details</h4>
      {children}
    </div>
  );
}

export default Inspection;