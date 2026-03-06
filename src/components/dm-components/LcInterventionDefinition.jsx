import React from 'react';

/**
 * Component for the S1000D <lcInterventionDefinition> element.
 * 
 * Defines the requirements for performance improvement interventions, both
 * training and non-training. A major section within a Learning Plan.
 * 
 * Parent: <LearningPlan>
 * Children: <title>, <description>, <lcNonTrainingInterventions>, <lcTrainingInterventions>, <lcLearningObjectives>
 */
export default function LcInterventionDefinition({ children }) {
  return (
    <section className="p-4 my-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h2 className="text-2xl font-bold text-purple-800 mb-2">Intervention Definition</h2>
      {children}
    </section>
  );
}