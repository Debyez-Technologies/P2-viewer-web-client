import React from 'react';

function SpecDocument({ children, ...props }) {
  // Renders information about a specification document.
  // Based on the S1000D schema, its primary child is a <refs> element.
  
  return (
    <div className="spec-document" {...props}>
      <strong>Specification Document: </strong> {props.specDocumentNumber} ({props.specDocumentType})
      {children}
    </div>
  );
}

export default SpecDocument;