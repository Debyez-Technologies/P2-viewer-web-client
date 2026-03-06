import React from 'react';

function AssocWarningMalfunction({ children, ...props }) {
  // Renders an associated fault, which could be a warning, malfunction, or BIT message.
  // It's a key part of a correlated fault description.
  // Based on the S1000D schema, children can be <fault>, <dmRef>, and <faultDescr>.
  
  const style = {
    border: '1px solid #facc15',
    borderRadius: '4px',
    padding: '12px',
    margin: '10px 0',
    backgroundColor: '#4e421b',
  };

  return (
    <div className="assoc-warning-malfunction" style={style} {...props}>
      {children}
    </div>
  );
}

export default AssocWarningMalfunction;