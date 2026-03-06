import React from 'react';

/**
 * Component for the S1000D <lcSequenceOption> element.
 * 
 * Contains a single answer item to be placed in a sequence by the learner.
 * 
 * Parent: Structural <lcSequenceOptionGroup>
 * Children: <lcAnswerOptionContent>, <lcSequence>
 */
export default function LcSequenceOption({ children }) {
  return (
    <div className="p-2 border rounded bg-white shadow-sm cursor-move">
      {children}
    </div>
  );
}