import React from 'react';

/**
 * Component for the S1000D <zone> element.
 * 
 * Contains information that describes a physical zone and its boundaries.
 * 
 * Parent: Structural <zoneAlts>
 * Children: <itemDescr>, <shortName>, <BoundaryFrom>, <BoundaryTo>, etc.
 */
export default function Zone({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}