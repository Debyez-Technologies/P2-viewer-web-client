import React from 'react';

/**
 * Component for the S1000D <lcSummativeEvaluation> element.
 * 
 * Defines the criteria for identifying larger patterns and trends in performance
 * and judging findings against the training objectives.
 * 
 * Parent: <LcPerformanceEvaluation>
 * Children: <title>, <description>, <lcImmediatePerformanceCompetence>, etc.
 */
export default function LcSummativeEvaluation({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Summative Evaluation</h3>
      {children}
    </div>
  );
}