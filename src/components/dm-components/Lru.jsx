import React from 'react';

function Lru({ children, ...props }) {
  // Renders identifying information for a Line Replaceable Unit (LRU).
  // Based on the S1000D schema, children are elements like <name>, <partRef>, etc.
  
  return (
    <div className="lru" {...props}>
      <strong>LRU: </strong>{children}
    </div>
  );
}

export default Lru;