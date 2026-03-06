import React from 'react';

/**
 * Component for the S1000D <lcPerformanceEvaluation> element.
 * 
 * Contains data regarding the requirements for an evaluation instrument or plan
 * to determine the success of an intervention. A major section in a Learning Plan.
 * 
 * Parent: <LearningPlan>
 * Children: <title>, <description>, <lcFormativeEvaluation>, <lcSummativeEvaluation>
 */
export default function LcPerformanceEvaluation({ children }) {
  return (
    <section className="p-4 my-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-800 mb-2">Performance Evaluation</h2>
      {children}
    </section>
  );
}