import React from 'react';

/**
 * Component for the S1000D <lcAnswerOption> element.
 * 
 * Represents a single selectable answer in an interactive question.
 * The actual rendering (radio button, checkbox) will be determined by its parent.
 * 
 * Parent: Structural <lcAnswerOptionGroup>
 * Children: <lcAnswerOptionContent> (which contains the answer text)
 */
export default function LcAnswerOption({ children }) {
  return (
    <div className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100">
      {children}
    </div>
  );
}