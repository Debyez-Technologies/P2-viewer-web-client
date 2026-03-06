import React from 'react';

/**
 * Component for the S1000D <learning> element.
 * 
 * This is the root container for all content within a learning data module.
 * It will contain one of the five main learning types as its direct child.
 * 
 * Parent: (content)
 * Children: <LearningPlan>, <LearningOverview>, <LearningContent>, 
 *           <LearningSummary>, or <LearningAssessment>
 */
export default function LearningContainer({ children }) {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 font-sans">
      {children}
    </div>
  );
}