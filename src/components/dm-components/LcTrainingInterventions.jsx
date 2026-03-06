import React from 'react';

/**
 * Component for the S1000D <lcTrainingInterventions> element.
 * 
 * Contains data defining the specifications and requirements for the design
 * and development of the courseware.
 * 
 * Parent: <LcInterventionDefinition>
 * Children: <title>, <description>, <lcTargetAudience>, <lcPrerequisites>, etc.
 */
export default function LcTrainingInterventions({ children }) {
  return (
    <div className="p-4 my-2 bg-white rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Training Interventions</h3>
      {children}
    </div>
  );
}