import React from 'react';

function DetectedSruItem({ children, ...props }) {
  // Renders information about a detected Shop Replaceable Unit (SRU), typically a child of an LRU.
  // Based on the S1000D schema, it contains an <sru> and <remarks>.
  
  const style = {
    marginLeft: '20px',
    paddingLeft: '15px',
    borderLeft: '1px solid #4b5563',
  };

  return (
    <div className="detected-sru-item" style={style} {...props}>
      {children}
    </div>
  );
}

export default DetectedSruItem;