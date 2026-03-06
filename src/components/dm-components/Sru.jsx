import React from 'react';

function Sru({ children, ...props }) {
  // Renders identifying information for a Shop Replaceable Unit (SRU).
  // Based on the S1000D schema, children are elements like <name>, <partRef>, etc.
  
  return (
    <div className="sru" {...props}>
      <strong>SRU: </strong>{children}
    </div>
  );
}

export default Sru;