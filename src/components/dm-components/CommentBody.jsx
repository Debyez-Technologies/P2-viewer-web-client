import React from 'react';

/**
 * Component for the S1000D <commentContent> element.
 * 
 * This is the main content area of the comment, containing the text of the
 * comment or response, as well as references to any attachments.
 * 
 * Hierarchy:
 *   - comment (RootContainer)
 *     - commentContent
 * 
 * Potential Children:
 * - simplePara (likely a TextBlock or similar)
 * - attachmentRef (likely a reference component)
 */
export default function CommentBody({ children }) {
  return (
    <div className="mt-6 p-4 border-t border-gray-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Content</h2>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}