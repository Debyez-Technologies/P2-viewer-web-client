import React from 'react';

function LocateAndRepairSruItem({ children, ...props }) {
  // Renders a container for locating and repairing a specific SRU.
  // Based on the S1000D schema, it contains an <sru> and <repair> info.
  
  const style = {
    marginLeft: '20px',
    paddingLeft: '15px',
    borderLeft: '1px solid #4b5563',
  };

  return (
    <div className="locate-repair-sru-item" style={style} {...props}>
      {children}
    </div>
  );
}

export default LocateAndRepairSruItem;