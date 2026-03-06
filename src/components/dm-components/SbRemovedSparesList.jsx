import React from 'react';

/**
 * Component for the S1000D <sbRemovedSparesList> element.
 * 
 * Contains the list of all spare parts removed during the SB, grouped by
 * set or listed individually.
 * 
 * Parent: Structural <sbMaterialInfoContent>
 * Children: <noInfo>, <SbRemovedSpareSet>, <SbIndividualRemovedSpare>, etc.
 */
export default function SbRemovedSparesList({ children }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-700">Removed Spares</h3>
      <div className="mt-2 space-y-4">{children}</div>
    </div>
  );
}