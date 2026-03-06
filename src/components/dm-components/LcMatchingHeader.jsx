import React from 'react';

/**
 * Component for the S1000D <lcMatchingHeader> element.
 * 
 * Contains the column headings for a matching table interaction.
 * 
 * Parent: <LcMatchTable>
 * Children: <lcItem>, <lcMatchingItem>
 */
export default function LcMatchingHeader({ children }) {
  return (
    <div className="flex bg-gray-100 font-bold text-gray-700">
      {children}
    </div>
  );
}