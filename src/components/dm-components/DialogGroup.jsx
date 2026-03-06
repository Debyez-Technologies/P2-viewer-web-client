import React from 'react';

function DialogGroup({ children, ...props }) {
  // Renders a container for positioning multiple dialog elements together.
  // It can be used to group related inputs or messages within a single dialog.
  // Based on the S1000D schema, it can contain <title>, <userEntry>, <menu>, <message>,
  // and even nested <dialogGroup> elements.
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: `1px solid ${props.dialogSeparator === '1' ? '#4f46e5' : 'transparent'}`,
    borderRadius: '5px',
  };

  return (
    <div className="dialog-group" style={style} {...props}>
      {children}
    </div>
  );
}

export default DialogGroup;