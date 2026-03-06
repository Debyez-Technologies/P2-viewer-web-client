import React from 'react';

/**
 * Component for the S1000D <learningAssessment> element.
 * 
 * The main container for an assessment, such as a pre-test or a final quiz.
 * It holds one or more interactive questions.
 * 
 * Parent: <LearningContainer>
 * Children: <title>, <shortDescr>, <lcIntro>, <LcInteraction>, etc.
 */
export default function LearningAssessment({ children }) {
  return (
    <article className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2">Assessment</h1>
      {children}
    </article>
  );
}