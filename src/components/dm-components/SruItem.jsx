import React from 'react';

function SruItem({ children, ...props }) {
  // Renders a container for testing a faulty SRU.
  // Based on the S1000D schema, it contains an <sru> and a <faultIsolationTest>.
  
  const style = {
    marginLeft: '20px',
    paddingLeft: '15px',
    borderLeft: '1px solid #4b5563',
  };

  return (
    <div className="sru-item" style={style} {...props}>
      {children}
    </div>
  );
}

export default SruItem;