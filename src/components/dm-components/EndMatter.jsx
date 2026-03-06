import React from 'react';

/**
 * Component for the S1000D <endMatter> element.
 * 
 * Contains concluding information or paragraphs that appear after the
 * main steps of a crew drill are complete.
 * 
 * Parent: <CrewDrill>
 * Children: <para>, <figure>, etc.
 */
export default function EndMatter({ children }) {
  return (
    <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">Concluding Actions</h3>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}