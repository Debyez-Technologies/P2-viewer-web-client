import React from 'react';

/**
 * Component for the S1000D <lcInternalFactor> element.
 * 
 * Contains information about causes of a performance gap that are directly
 * attributable to the human performer (e.g., knowledge, motives, capacity).
 * 
 * Parent: <LcCauseAnalysis>
 * Children: <title>, <description>, <lcKnowledge>, <lcCapacity>, <lcMotives>
 */
export default function LcInternalFactor({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Internal Factors</h3>
      {children}
    </div>
  );
}