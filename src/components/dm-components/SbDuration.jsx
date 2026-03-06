import React from 'react';

/**
 * Component for the S1000D <sbDuration> element.
 * 
 * Displays the elapsed time (eg, in hours or days) for performing the actions
 * specified in the Service Bulletin.
 * 
 * Parent: <SbTimeInfo>
 * Children: <quantity>
 */
export default function SbDuration({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">Duration:</span>
      <span>{children}</span>
    </div>
  );
}