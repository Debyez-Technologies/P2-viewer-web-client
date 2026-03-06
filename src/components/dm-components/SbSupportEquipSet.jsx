import React from 'react';

/**
 * Component for the S1000D <sbSupportEquipSet> element.
 * 
 * Contains information about a set of support equipment.
 * 
 * Parent: <SbSupportEquipsList>
 * Children: <name>, <sbProcurementInfo>, <SbIndividualSupportEquip>, etc.
 */
export default function SbSupportEquipSet({ children }) {
  return (
    <div className="p-3 border rounded-md">
      {children}
    </div>
  );
}