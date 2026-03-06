import React from 'react';

/**
 * Component for the S1000D <sbSupportEquipsList> element.
 * 
 * Contains the list of support equipment involved in the Service Bulletin.
 * 
 * Parent: Structural <sbMaterialInfoContent>
 * Children: <noInfo>, <SbSupportEquipSet>, <SbIndividualSupportEquip>, etc.
 */
export default function SbSupportEquipsList({ children }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-700">Support Equipment</h3>
      <div className="mt-2 space-y-4">{children}</div>
    </div>
  );
}