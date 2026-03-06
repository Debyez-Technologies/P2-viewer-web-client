import React from 'react';

/**
 * Component for the S1000D <learningSummary> element.
 * 
 * A top-level container that recaps the learning content and provides
 * next steps or additional resources.
 * 
 * Parent: <LearningContainer>
 * Children: <title>, <lcSummary>, <lcReview>, <lcNextSteps>, etc.
 */
export default function LearningSummary({ children }) {
  return (
    <article className="space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2">Summary</h1>
      {children}
    </article>
  );
}