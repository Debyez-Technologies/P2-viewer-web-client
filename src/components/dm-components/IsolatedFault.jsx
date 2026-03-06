import React from 'react';

function IsolatedFault({ children, ...props }) {
  // Renders a container for an isolated fault.
  // Based on the S1000D schema, it contains <faultDescr>, <detectionInfo>,
  // and <locateAndRepair> information.
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: '1px solid #16a34a',
    backgroundColor: '#2a443a',
    borderRadius: '5px',
  };

  return (
    <section className="isolated-fault" style={style} {...props}>
      <h3>Isolated Fault: {props.faultCode}</h3>
      {children}
    </section>
  );
}

export default IsolatedFault;