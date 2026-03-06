import React from 'react';

/**
 * Component for the S1000D <lcNonTrainingInterventions> element.
 * 
 * Contains data defining requirements for non-training performance improvement interventions.
 * 
 * Parent: <LcInterventionDefinition>
 * Children: <title>, <description>, <lcPerformanceSupport>, <lcJobDesign>, etc.
 */
export default function LcNonTrainingInterventions({ children }) {
  return (
    <div className="p-4 my-2 bg-white rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Non-Training Interventions</h3>
      {children}
    </div>
  );
}