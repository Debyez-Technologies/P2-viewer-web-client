import React from 'react';

/**
 * Component for the S1000D <lcEnvironmentalFactor> element.
 * 
 * Contains information about causes of a performance gap that are external
 * to the human performer.
 * 
 * Parent: <LcCauseAnalysis>
 * Children: <title>, <description>, <lcData>, <lcResources>, <lcIncentives>
 */
export default function LcEnvironmentalFactor({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Environmental Factors</h3>
      {children}
    </div>
  );
}