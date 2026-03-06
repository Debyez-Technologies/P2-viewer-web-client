import React from 'react';

/**
 * Component for the S1000D <sbReplacementSb> element.
 * 
 * Contains information about another Service Bulletin that can replace the current one.
 * 
 * Parent: <SbManagementInfo>
 * Children: <noInfo>, <refs>
 */
export default function SbReplacementSb({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Replacement Service Bulletin</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}