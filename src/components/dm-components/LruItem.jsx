import React from 'react';

function LruItem({ children, ...props }) {
  // Renders a container for testing a faulty LRU.
  // Based on the S1000D schema, it contains an <lru>, a <faultIsolationTest>,
  // and potentially nested <sruItem>s.
  
  return (
    <div className="lru-item" {...props}>
      {children}
    </div>
  );
}

export default LruItem;