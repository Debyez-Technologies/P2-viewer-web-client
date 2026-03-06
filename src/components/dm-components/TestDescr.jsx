import React from 'react';

function TestDescr({ children, ...props }) {
  // Renders the description of a test.
  // Based on the S1000D schema, it contains a <testName> and <refs>.
  
  return (
    <div className="test-descr" {...props}>
      {children}
    </div>
  );
}

export default TestDescr;