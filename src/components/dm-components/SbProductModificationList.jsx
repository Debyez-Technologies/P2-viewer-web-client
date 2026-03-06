import React from 'react';

/**
 * Component for the S1000D <sbProductModificationList> element.
 * 
 * Contains a list of manufacturer's internal tracking numbers for product
 * changes described in the Service Bulletin.
 * 
 * Parent: <SbManagementInfo>
 * Children: <noInfo>, <sbProductModification> (TextBlock)
 */
export default function SbProductModificationList({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Product Modifications</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}