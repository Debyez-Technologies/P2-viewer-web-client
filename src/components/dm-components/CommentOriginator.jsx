import React from 'react';

/**
 * Component for the S1000D <commentOriginator> element.
 * 
 * A container for information about the person or organization that
 * created the comment.
 * 
 * Hierarchy:
 *   - (identAndStatusSection)
 *     - (commentAddress)
 *       - (commentAddressItems)
 *         - commentOriginator
 * 
 * Potential Children:
 * - dispatchAddress (Visible Component: DispatchAddress)
 */
export default function CommentOriginator({ children }) {
  return (
    <div className="my-2">
      <h3 className="text-md font-semibold text-gray-700">Originator:</h3>
      {children}
    </div>
  );
}