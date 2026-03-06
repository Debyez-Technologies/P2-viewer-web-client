import React from 'react';

/**
 * Component for the S1000D <lcAssessmentStrategy> element.
 * 
 * Contains the plan for assessing learners' achievements in relation to an objective.
 * 
 * Parent: <LcTrainingInterventions>
 * Children: <title>, <description>, <LcAssessmentComponent>
 */
export default function LcAssessmentStrategy({ children }) {
  return (
    <div className="p-4 my-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Assessment Strategy</h3>
      {children}
    </div>
  );
}