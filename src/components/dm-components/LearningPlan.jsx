import React from 'react';

/**
 * Component for the S1000D <learningPlan> element.
 * 
 * A top-level container for a learning plan, which captures the analysis,
 * strategy, and evaluation requirements for a training initiative.
 * 
 * Parent: <LearningContainer>
 * Children: <LcProject>, <LcPerformanceAnalysis>, <LcCauseAnalysis>, 
 *           <LcInterventionDefinition>, etc.
 */
export default function LearningPlan({ children }) {
  return (
    <article className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2">Learning Plan</h1>
      {children}
    </article>
  );
}