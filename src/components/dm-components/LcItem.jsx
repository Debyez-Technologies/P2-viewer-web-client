import React from 'react';

/**
 * Component for the S1000D <lcItem> element.
 * 
 * Contains content for one half of a matching pair in an assessment.
 * 
 * Parent: <LcMatchingHeader>, <LcMatchingPair>
 * Children: <description>
 */
export default function LcItem({ children }) {
  return (
    <div className="flex-1 p-2">
      {children}
    </div>
  );
}