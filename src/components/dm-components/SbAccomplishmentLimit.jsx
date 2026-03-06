import React from 'react';

/**
 * Component for the S1000D <sbAccomplishmentLimit> element.
 * 
 * Contains information on the recommended time limit for accomplishing the Service Bulletin.
 * 
 * Parent: <SbManagementInfo>
 * Children: <noInfo>, <SbLimit>
 */
export default function SbAccomplishmentLimit({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Accomplishment Time Limit</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}