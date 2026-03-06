import React from 'react';

/**
 * Component for the S1000D <sbIndividualSupportEquip> element.
 * 
 * Contains information about an individual piece of support equipment
 * required for the Service Bulletin.
 * 
 * Parent: <SbSupportEquipSet>, <SbSupportEquipsList>
 * Children: <embeddedSupportEquipDescr>, <sbProcurementInfo>, etc.
 */
export default function SbIndividualSupportEquip({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}