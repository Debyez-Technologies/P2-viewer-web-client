import React from 'react';

/**
 * Component for the S1000D <supplyRqmtSpec> element.
 * 
 * The main container for all properties of a single supply requirement.
 * 
 * Parent: Structural <supplyRqmtRepository>
 * Children: <supplyRqmtIdent> (Structural), <supplyRqmtAlts> (Structural), etc.
 */
export default function SupplyRqmtSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}