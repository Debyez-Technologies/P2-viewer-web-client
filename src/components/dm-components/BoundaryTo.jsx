import React from 'react';

/**
 * Component for the S1000D <boundaryTo> element.
 * 
 * Defines a "to" or ending boundary of a zone.
 * 
 * Parent: <Zone>
 * Children: <boundary> (TextBlock)
 */
export default function BoundaryTo({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">To:</span>
      <span>{children}</span>
    </div>
  );
}