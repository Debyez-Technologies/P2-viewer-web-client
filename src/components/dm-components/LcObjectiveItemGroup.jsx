import React from 'react';

/**
 * Component for the S1000D <lcObjectiveItemGroup> element.
 * 
 * A container for a group of related learning objectives. It can have its
 * own title and description, making it a visible grouping element.
 * 
 * Parent: <LcLearningObjectives>, <LcObjectiveItem> (for nesting)
 * Children: <title>, <description>, <LcObjectiveItem>
 */
export default function LcObjectiveItemGroup({ children }) {
  return (
    <div className="p-3 my-2 border-l-4 border-gray-300">
      {children}
    </div>
  );
}