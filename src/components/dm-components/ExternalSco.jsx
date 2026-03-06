import React from 'react';

/**
 * Component for the S1000D <externalSco> element.
 * 
 * Used to link to an existing Sharable Content Object (SCO) that is not
 * managed in accordance with S1000D.
 * 
 * Parent: <ScoContentContainer>
 * Children: <externalPubRef> (which will render the link)
 */
export default function ExternalSco({ children }) {
  return (
    <div className="p-4 my-4 border border-dashed border-gray-400 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">External Content</h3>
      {children}
    </div>
  );
}