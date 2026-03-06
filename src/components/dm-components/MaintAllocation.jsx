import React from 'react';

function MaintAllocation({ children, ...props }) {
  // Renders the main container for maintenance allocation information, which designates
  // responsibility for maintenance functions.
  // Based on the S1000D schema, it contains a <title> and <maintAllocationGroup>(s).
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: '1px solid #4a5568',
    borderRadius: '8px',
  };

  return (
    <section className="maint-allocation" style={style} {...props}>
      {children}
    </section>
  );
}

export default MaintAllocation;