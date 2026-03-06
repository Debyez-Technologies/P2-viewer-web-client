import React from 'react';

/**
 * Component for the S1000D <lcAudience> element.
 * 
 * Contains the profile of the intended learner for the instruction.
 * 
 * Parent: <LearningOverview>
 * Children: <title>, <description>, <LcEntryBehavior>
 */
export default function LcAudience({ children }) {
  return (
    <div className="p-4 my-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">Target Audience</h2>
      {children}
    </div>
  );
}