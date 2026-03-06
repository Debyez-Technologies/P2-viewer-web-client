import React from 'react';

/**
 * Component for the S1000D <lcGapItem> element.
 * 
 * A container for defining a single performance gap, comparing the
 * desired performance statement with the actual one.
 * 
 * Parent: <LcGapAnalysis>
 * Children: <title>, <description>, <lcDesiredPerformanceStatement>, etc.
 */
export default function LcGapItem({ children }) {
  return (
    <div className="p-3 my-2 border-l-4 border-gray-300">
      {children}
    </div>
  );
}