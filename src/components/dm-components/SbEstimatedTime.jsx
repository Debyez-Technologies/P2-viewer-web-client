import React from 'react';

/**
 * Component for the S1000D <sbEstimatedTime> element.
 * 
 * Displays the estimated aggregated time (eg, man-hours) to complete the work.
 * 
 * Parent: <SbTimeInfo>
 * Children: <quantity>
 */
export default function SbEstimatedTime({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">Estimated Time:</span>
      <span>{children}</span>
    </div>
  );
}