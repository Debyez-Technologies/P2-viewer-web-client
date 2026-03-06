import React from 'react';

function TestProcedure({ children, ...props }) {
  // Renders a container for references to test procedures.
  // Based on the S1000D schema, its child is a <refs> element.
  
  return (
    <div className="test-procedure" {...props}>
      <strong>Procedure: </strong>{children}
    </div>
  );
}

export default TestProcedure;