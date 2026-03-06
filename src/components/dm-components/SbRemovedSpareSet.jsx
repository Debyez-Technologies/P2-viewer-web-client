import React from 'react';

/**
 * Component for the S1000D <sbRemovedSpareSet> element.
 * 
 * Contains information about a set of spare parts that are removed from the
 * product during the Service Bulletin.
 * 
 * Parent: <SbRemovedSparesList>
 * Children: <name>, <SbIndividualRemovedSpare>, etc.
 */
export default function SbRemovedSpareSet({ children }) {
  return (
    <div className="p-3 border rounded-md">
      {children}
    </div>
  );
}