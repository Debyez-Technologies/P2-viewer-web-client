import React from 'react';

/**
 * Component for the S1000D <sbSpareSet> element.
 * 
 * Contains information about a set of spare parts.
 * 
 * Parent: <SbSparesList>
 * Children: <name>, <shortName>, <SbIndividualSpare>, etc.
 */
export default function SbSpareSet({ children }) {
  return (
    <div className="p-3 border rounded-md">
      {children}
    </div>
  );
}