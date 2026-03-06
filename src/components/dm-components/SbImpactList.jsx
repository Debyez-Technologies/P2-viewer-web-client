import React from 'react';

/**
 * Component for the S1000D <sbImpactList> element.
 * 
 * Contains a list of impacts the Service Bulletin will have on the product,
 * such as changes to weight, balance, etc.
 * 
 * Parent: <SbManagementInfo>
 * Children: <noInfo>, <sbImpact> (TextBlock)
 */
export default function SbImpactList({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Impact on Product</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}