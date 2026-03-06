import React from 'react';

/**
 * Component for the S1000D <supplyRqmt> element.
 * 
 * Represents one alternative of a supply requirement, listing one or more
 * supplies that can fulfill that requirement.
 * 
 * Parent: Structural <supplyRqmtAlts>
 * Children: <name>, <shortName>, <specGroup>, etc.
 */
export default function SupplyRqmt({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}