import React from 'react';

/**
 * Component for the S1000D <lcWorkEnvironmentAnalysis> element.
 * 
 * Contains information about factors in the immediate work environment that can
 * influence performance.
 * 
 * Parent: <LcPerformanceAnalysis>
 * Children: <title>, <description>, <lcManagerialSupport>, etc.
 */
export default function LcWorkEnvironmentAnalysis({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Work Environment Analysis</h3>
      {children}
    </div>
  );
}