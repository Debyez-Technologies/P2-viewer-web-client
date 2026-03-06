import React from 'react';

/**
 * Component for the S1000D <commentStatus> element.
 * 
 * A major section of the comment form that contains status information like
 * security, priority, response type, and references.
 * 
 * Hierarchy:
 *   - (identAndStatusSection)
 *     - commentStatus
 * 
 * Potential Children:
 * - security (Visible component - assuming it exists)
 * - controlAuthorityGroup (Structural)
 * - dataRestrictions (Visible component - assuming it exists)
 * - commentPriority (Metadata - not rendered in main view)
 * - commentResponse (Metadata - not rendered in main view)
 * - commentRefs (Visible Component: CommentRefs)
 * - brexDmRef (Visible component - assuming it exists)
 * - remarks (Visible component - assuming it exists)
 */
export default function CommentStatusSection({ children }) {
  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Status Information</h2>
      {children}
    </div>
  );
}