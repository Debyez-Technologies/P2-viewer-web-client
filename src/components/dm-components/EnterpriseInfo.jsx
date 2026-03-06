import React from 'react';

/**
 * Component for the S1000D <enterprise> element.
 * 
 * Displays the name and organizational units of the enterprise.
 * 
 * Hierarchy:
 *   - dispatchAddress
 *     - enterprise
 * 
 * Potential Children:
 * - enterpriseName, division, enterpriseUnit (all rendered as TextBlocks)
 */
export default function EnterpriseInfo({ children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-600">Enterprise:</h4>
      <div className="pl-4 text-gray-800">
        {children}
      </div>
    </div>
  );
}