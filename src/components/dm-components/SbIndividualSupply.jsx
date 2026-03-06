import React from 'react';

/**
 * Component for the S1000D <sbIndividualSupply> element.
 * 
 * Contains information about an individual supply item (consumable)
 * required for the Service Bulletin. This is for supplies not part of a kit.
 * 
 * Parent: <SbSuppliesList> or <SbSupplySet>
 * Children: <embeddedSupplyDescr>, <sbDrawingRef>, <sbProcurementInfo>,
 *           <sbIndustrySupport>, <sbInstructionRef>, <footnoteRemarks>
 */
export default function SbIndividualSupply({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}