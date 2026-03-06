import React from 'react';

/**
 * Component for the S1000D <lcMatching> element.
 * 
 * Renders a matching assessment interaction, where learners link related items.
 * 
 * Parent: <LcInteraction>
 * Children: <title>, <LcQuestion>, <lcAsset>, <lcMatchTable>, <lcFeedbackItemGroup>
 */
export default function LcMatching({ children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-500 mb-2">Matching Question</h4>
      {children}
    </div>
  );
}