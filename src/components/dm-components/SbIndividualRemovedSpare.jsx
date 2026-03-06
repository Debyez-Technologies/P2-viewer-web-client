import React from 'react';

/**
 * Component for the S1000D <sbIndividualRemovedSpare> element.
 * 
 * Contains detailed information about a single spare part that is removed
 * during the Service Bulletin procedure.
 * 
 * Parent: <SbRemovedSpareSet>, <SbRemovedSparesList>
 * Children: <SbRemovedSpareDescr>, <sbInterchange>, etc.
 */
export default function SbIndividualRemovedSpare({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}