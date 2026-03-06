import React from 'react';

/**
 * Component for the S1000D <functionalItem> element.
 * 
 * Describes a functional item (also known as a reference designator) and
 * provides further information based on product configuration.
 * 
 * Parent: Structural <functionalItemAlts>
 * Children: <name>, <shortName>, <LocationBlock>, <AccessFromBlock>, etc.
 */
export default function FunctionalItem({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}