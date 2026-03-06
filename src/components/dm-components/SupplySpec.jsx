import React from 'react';

/**
 * Component for the S1000D <supplySpec> element.
 * 
 * Contains all associated properties for a single supply item (consumable).
 * This is a main entry in a supply repository.
 * 
 * Parent: Structural <supplyRepository>
 * Children: <supplyIdent> (Structural), <name>, <specGroup>, <enterpriseGroup>, etc.
 */
export default function SupplySpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* The backend should process <supplyIdent> and pass its number/type as props
          to be used as a title here. */}
      {children}
    </div>
  );
}