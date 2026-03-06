import React from 'react';

/**
 * Component for the S1000D <sbSupplySet> element.
 * 
 * Contains information about a set of supply items (consumables).
 * 
 * Parent: <SbSuppliesList>
 * Children: <name>, <sbProcurementInfo>, <SbIndividualSupply>, etc.
 */
export default function SbSupplySet({ children }) {
  return (
    <div className="p-3 border rounded-md">
      {children}
    </div>
  );
}