import React from 'react';

/**
 * Component for the S1000D <lcInteraction> element.
 * 
 * This is a wrapper for a single interactive assessment item, such as a
 * multiple-choice question, a true/false question, etc.
 * 
 * Parent: <LearningAssessment>
 * Children: One of <lcTrueFalse>, <lcSingleSelect>, <lcMultipleSelect>, etc.
 */
export default function LcInteraction({ children }) {
  return (
    <div className="my-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}