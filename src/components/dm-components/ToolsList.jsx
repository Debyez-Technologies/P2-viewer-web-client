import React from 'react';

function ToolsList({ children, ...props }) {
  // Renders a list of support equipment (tools) required for maintenance.
  // Based on the S1000D schema, it contains a <title> and <toolsListGroup>(s).
  
  const style = {
    marginTop: '1.5em',
  };

  return (
    <div className="tools-list" style={style} {...props}>
      {children}
    </div>
  );
}

export default ToolsList;