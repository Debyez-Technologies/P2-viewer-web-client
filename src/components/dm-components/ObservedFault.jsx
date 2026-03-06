import React from 'react';

function ObservedFault({ children, ...props }) {
  // Renders a container for an observed fault (one not detected by a system).
  // Based on the S1000D schema, it contains <faultDescr> and <contextAndIsolationInfo>.
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: '1px solid #6b7280',
    backgroundColor: '#374151',
    borderRadius: '5px',
  };

  return (
    <section className="observed-fault" style={style} {...props}>
      <h3>Observed Fault: {props.faultType || props.id}</h3>
      {children}
    </section>
  );
}

export default ObservedFault;