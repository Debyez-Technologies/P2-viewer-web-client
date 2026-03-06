import React from 'react';

/**
 * Component for the S1000D <sbIndividualSpare> element.
 * 
 * Contains detailed information about a single spare part.
 * 
 * Parent: <SbSparesList> or <SbSpareSet>
 * Children: <embeddedSpareDescr>, <sbProcurementInfo>, etc.
 */
export default function SbIndividualSpare({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}