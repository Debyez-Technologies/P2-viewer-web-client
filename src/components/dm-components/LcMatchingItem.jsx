import React from 'react';

/**
 * Component for the S1000D <lcMatchingItem> element.
 * 
 * Contains content for the other half of a matching pair in an assessment,
 * corresponding to an <lcItem>.
 * 
 * Parent: <LcMatchingHeader>, <LcMatchingPair>
 * Children: <description>
 */
export default function LcMatchingItem({ children }) {
  return (
    <div className="flex-1 p-2">
      {children}
    </div>
  );
}