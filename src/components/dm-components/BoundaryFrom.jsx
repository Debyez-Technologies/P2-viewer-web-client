import React from 'react';

/**
 * Component for the S1000D <boundaryFrom> element.
 * 
 * Defines a "from" or starting boundary of a zone.
 * 
 * Parent: <Zone>
 * Children: <boundary> (TextBlock)
 */
export default function BoundaryFrom({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">From:</span>
      <span>{children}</span>
    </div>
  );
}