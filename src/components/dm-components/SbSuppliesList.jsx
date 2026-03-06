import React from 'react';

/**
 * Component for the S1000D <sbSuppliesList> element.
 * 
 * Contains the list of supplies (consumables) involved in the Service Bulletin.
 * 
 * Parent: Structural <sbMaterialInfoContent>
 * Children: <noInfo>, <SbSupplySet>, <SbIndividualSupply>, etc.
 */
export default function SbSuppliesList({ children }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-700">Supplies</h3>
      <div className="mt-2 space-y-4">{children}</div>
    </div>
  );
}