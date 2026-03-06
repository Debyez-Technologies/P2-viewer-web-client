import React from 'react';

function FaultIsolationTest({ children, ...props }) {
  // Renders a container for a fault isolation test.
  // Based on the S1000D schema, it contains <testDescr> and <testProcedure>.
  
  const style = {
    border: '1px solid #1d4ed8',
    borderRadius: '4px',
    padding: '12px',
    margin: '10px 0',
    backgroundColor: '#28304a'
  };

  return (
    <div className="fault-isolation-test" style={style} {...props}>
      <strong>Test ({props.testCode}):</strong>
      {children}
    </div>
  );
}

export default FaultIsolationTest;