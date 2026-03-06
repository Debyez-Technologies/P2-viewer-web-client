import React from 'react';

/**
 * Component for the S1000D <lcMatchingPair> element.
 * 
 * Contains a table row with the pair of items that comprise a correct match
 * in a matching interaction.
 * 
 * Parent: <LcMatchTable>
 * Children: <lcItem>, <lcMatchingItem>
 */
export default function LcMatchingPair({ children }) {
  return (
    <div className="flex border-t border-gray-200">
      {children}
    </div>
  );
}