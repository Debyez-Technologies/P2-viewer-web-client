import React from 'react';

/**
 * Component for the S1000D <commentRefs> element.
 * 
 * A container for all references associated with the comment, such as
 * references to data modules, publication modules, or other S1000D objects.
 * 
 * Hierarchy:
 *   - commentStatus
 *     - commentRefs
 * 
 * Potential Children:
 * - noReferences (Visible Component: NoReferences)
 * - dmRefGroup (Structural, children will be promoted)
 * - dmlRefGroup (Structural, children will be promoted)
 * - pmRefGroup (Structural, children will be promoted)
 * - ddnRefGroup (Structural, children will be promoted)
 */
export default function CommentRefs({ children }) {
  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold text-gray-700 border-b pb-1 mb-2">References</h3>
      {children}
    </div>
  );
}