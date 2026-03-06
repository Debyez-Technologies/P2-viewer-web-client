import React from 'react';

/**
 * Component for the S1000D <functionalItemSpec> element.
 * 
 * The main container for all properties of a single functional item in a repository.
 * 
 * Parent: Structural <functionalItemRepository>
 * Children: <functionalItemIdent> (Structural), <name>, <functionalItemAlts> (Structural), etc.
 */
export default function FunctionalItemSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}