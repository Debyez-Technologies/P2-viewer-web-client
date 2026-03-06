import React from 'react';

/**
 * Component for the S1000D <toolSpec> element.
 * 
 * Contains all associated properties for one piece of support equipment.
 * 
 * Parent: Structural <toolRepository>
 * Children: <toolIdent> (Structural), <itemIdentData>, <toolAlts> (Structural), etc.
 */
export default function ToolSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}