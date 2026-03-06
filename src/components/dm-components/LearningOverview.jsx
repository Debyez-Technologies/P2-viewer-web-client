import React from 'react';

/**
 * Component for the S1000D <learningOverview> element.
 * 
 * A top-level container for introductory learning content, providing context
 * to the learner about the course or module.
 * 
 * Parent: <LearningContainer>
 * Children: <title>, <description>, <LcAudience>, <LcDuration>, etc.
 */
export default function LearningOverview({ children }) {
  return (
    <article className="space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2">Overview</h1>
      {children}
    </article>
  );
}