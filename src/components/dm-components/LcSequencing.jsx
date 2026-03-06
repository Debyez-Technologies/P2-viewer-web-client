import React from 'react';

/**
 * Component for the S1000D <lcSequencing> element.
 * 
 * Renders a sequencing interaction where the learner must order a list of items.
 * 
 * Parent: <LcInteraction>
 * Children: <title>, <LcQuestion>, <lcAsset>, <lcSequenceOptionGroup>, <lcFeedbackItemGroup>
 */
export default function LcSequencing({ children }) {
  // State management for ordered list would be implemented here.
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-500 mb-2">Sequencing Question</h4>
      {children}
    </div>
  );
}