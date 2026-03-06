import React from 'react';

/**
 * Component for the S1000D <lcObjectiveItem> element.
 * 
 * Contains a single learning objective, which can be nested.
 * 
 * Parent: <LcObjectiveItemGroup>
 * Children: <title>, <description>, <dmRef>, <LcObjectiveItemGroup>
 */
export default function LcObjectiveItem({ children }) {
  return (
    <div className="p-2 my-1 border-l-2 border-blue-500">
      {children}
    </div>
  );
}