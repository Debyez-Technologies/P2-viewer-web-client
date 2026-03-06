import React from 'react';

function CorrelatedFault({ children, ...props }) {
  // Renders a container for information on correlated faults.
  // Based on the S1000D schema, it contains <basicCorrelatedFaults> (structural)
  // and <isolateDetectedFault> (structural), so their children will appear here.
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: '1px solid #6b7280',
    backgroundColor: '#374151',
    borderRadius: '5px',
  };

  return (
    <section className="correlated-fault" style={style} {...props}>
      <h3>Correlated Fault: {props.id}</h3>
      {children}
    </section>
  );
}

export default CorrelatedFault;