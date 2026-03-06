import React from 'react';

/**
 * Component for the S1000D <dispatchPerson> element.
 * 
 * Displays information about the specific point of contact.
 * 
 * Hierarchy:
 *   - dispatchAddress
 *     - dispatchPerson
 * 
 * Potential Children:
 * - lastName, firstName, jobTitle (all rendered as TextBlocks)
 */
export default function DispatchPerson({ children }) {
  return (
    <div className="mt-2">
      <h4 className="text-sm font-semibold text-gray-600">Contact Person:</h4>
      <div className="pl-4 text-gray-800">
        {children}
      </div>
    </div>
  );
}