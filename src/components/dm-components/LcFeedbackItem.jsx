import React from 'react';

/**
 * Component for the S1000D <lcFeedbackItem> element.
 * 
 * Contains feedback information to be displayed to a learner after an
 * interaction attempt (e.g., "Correct" or "Incorrect, please try again").
 * 
 * Parent: Structural <lcFeedbackItemGroup>
 * Children: <description>, <internalRef>
 */
export default function LcFeedbackItem({ attributes, children }) {
  const isCorrect = attributes.feedbackStatus === 'fbCorrect';
  const color = isCorrect ? 'green' : 'red';
  
  return (
    <div className={`p-2 border-l-4 border-${color}-500 bg-${color}-50 text-${color}-800`}>
      {children}
    </div>
  );
}