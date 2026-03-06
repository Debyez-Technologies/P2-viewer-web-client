import React from 'react';

/**
 * Component for the S1000D <sbTimeInfo> element.
 * 
 * Contains time information like duration and elapsed time, based on
 * applicability and the task to perform.
 * 
 * Parent: <SbTimeAssessment>
 * Children: <sbCondition>, <SbDuration>, <SbEstimatedTime>, <refs>
 */
export default function SbTimeInfo({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}