import React from 'react';

/**
 * Component for the S1000D <lcCauseAnalysis> element.
 * 
 * Describes the root causes of a potential or observed human performance gap.
 * This is a major section within a Learning Plan.
 * 
 * Parent: <LearningPlan>
 * Children: <title>, <description>, <LcEnvironmentalFactor>, <LcInternalFactor>
 */
export default function LcCauseAnalysis({ children }) {
  return (
    <section className="p-4 my-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-800 mb-2">Cause Analysis</h2>
      {children}
    </section>
  );
}