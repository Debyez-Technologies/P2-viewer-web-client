import React from 'react';

/**
 * Component for the S1000D <sbApprovedDm> element.
 * 
 * Contains a list of data modules that have been approved as part of the
 * current Service Bulletin.
 * 
 * Parent: <SbManagementInfo>
 * Children: <noInfo>, <refs>
 */
export default function SbApprovedDm({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Approved Data Modules</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}