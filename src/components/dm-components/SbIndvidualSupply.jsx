import React from 'react';

/**
 * Component for the S1000D <sbIndividualSupply> element.
 * 
 * Contains information about an individual supply item (consumable)
 * required for the Service Bulletin.
 * 
 * Parent: <SbSuppliesList>, <SbSupplySet>
 * Children: <embeddedSupplyDescr>, <sbProcurementInfo>, etc.
 */
export default function SbIndividualSupply({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}