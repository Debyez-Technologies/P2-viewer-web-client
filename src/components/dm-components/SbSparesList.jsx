import React from 'react';

/**
 * Component for the S1000D <sbSparesList> element.
 * 
 * Contains a list of spare parts involved in the Service Bulletin, which can
 * be grouped into sets, listed individually, or referenced externally.
 * 
 * Parent: Structural <sbMaterialInfoContent>
 * Children: <SbSpareSet>, <SbIndividualSpare>, <SbExternalMaterialSet>, etc.
 */
export default function SbSparesList({ children }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-700">Spares</h3>
      <div className="mt-2 space-y-4">
        {children}
      </div>
    </div>
  );
}