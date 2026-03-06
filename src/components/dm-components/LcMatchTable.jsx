import React from 'react';

/**
 * Component for the S1000D <lcMatchTable> element.
 * 
 * Provides the data table structure for a matching interaction, defining
 * the items to be matched and their correct pairs.
 * 
 * Parent: <LcMatching>, <LcDragAndDrop>
 * Children: <lcMatchingHeader>, <lcMatchingPair>
 */
export default function LcMatchTable({ children }) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {children}
    </div>
  );
}