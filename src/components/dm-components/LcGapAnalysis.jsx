import React from 'react';

/**
 * Component for the S1000D <lcGapAnalysis> element.
 * 
 * Defines the delta between an organization's desired end state and its
 * current state, identifying performance gaps.
 * 
 * Parent: <LcPerformanceAnalysis>
 * Children: <title>, <description>, <LcGapItem>
 */
export default function LcGapAnalysis({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Gap Analysis</h3>
      {children}
    </div>
  );
}