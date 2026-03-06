import React from 'react';

/**
 * Component for the S1000D <lcAssessmentComponent> element.
 * 
 * Contains the specifications for evaluating a learner for a training component,
 * including mastery criteria and scoring methods.
 * 
 * Parent: <LcAssessmentStrategy>
 * Children: <title>, <description>, <lcMasteryScoreCriteria>, <lcPerformanceRubric>, etc.
 */
export default function LcAssessmentComponent({ children }) {
  return (
    <div className="p-4 my-2 border border-gray-200 rounded-md bg-white">
      {children}
    </div>
  );
}