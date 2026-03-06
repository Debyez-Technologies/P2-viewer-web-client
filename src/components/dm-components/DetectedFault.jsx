import React from 'react';

function DetectedFault({ children, ...props }) {
  // Renders a container for information on a detected fault.
  // Based on the S1000D schema, it contains <faultDescr> and <detectionInfo>.
  
  const style = {
    padding: '16px',
    margin: '1em 0',
    border: '1px solid #6b7280',
    backgroundColor: '#374151',
    borderRadius: '5px',
  };

  return (
    <section className="detected-fault" style={style} {...props}>
      <h3>Detected Fault: {props.faultCode}</h3>
      {children}
    </section>
  );
}

export default DetectedFault;