import React from 'react';

/**
 * Component for the S1000D <sbTimeAssessment> element.
 * 
 * Contains time information (duration, elapsed time) necessary to perform the SB.
 * 
 * Parent: <SbManagementInfo>
 * Children: <SbTimeInfo>
 */
export default function SbTimeAssessment({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Time Assessment</h3>
      {children}
    </div>
  );
}