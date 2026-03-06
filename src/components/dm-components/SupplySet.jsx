import React from 'react';

/**
 * Component for the S1000D <supplySet> element.
 * 
 * Identifies a set of supplies that must be used together (e.g., a two-part epoxy).
 * 
 * Parent: Structural <supplySetGroup>
 * Children: <supplyRef>
 */
export default function SupplySet({ children }) {
  return (
    <div className="p-2 border border-gray-200 rounded-md">
      <h4 className="text-sm font-semibold text-gray-600 mb-1">Supply Set:</h4>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}