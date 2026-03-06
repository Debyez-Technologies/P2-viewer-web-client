import React from 'react';

/**
 * Component for the S1000D <lcPerformanceAnalysis> element.
 * 
 * Contains information and requirements from an analysis of human performance
 * or training needs. A major section within a Learning Plan.
 * 
 * Parent: <LearningPlan>
 * Children: <title>, <description>, <lcOrganizationalAnalysis>, <lcGapAnalysis>, etc.
 */
export default function LcPerformanceAnalysis({ children }) {
  return (
    <section className="p-4 my-4 bg-green-50 border border-green-200 rounded-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-2">Performance Analysis</h2>
      {children}
    </section>
  );
}