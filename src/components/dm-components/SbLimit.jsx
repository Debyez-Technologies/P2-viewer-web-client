import React from 'react';

/**
 * Component for the S1000D <sbLimit> element.
 * 
 * Contains information related to intervals, thresholds, and time limits
 * for scheduling the SB accomplishment.
 * 
 * Parent: <SbAccomplishmentLimit>
 * Children: <sbInstructionRef>, <SbTimeCompliance>
 */
export default function SbLimit({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}