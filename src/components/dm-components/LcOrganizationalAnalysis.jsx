import React from 'react';

/**
 * Component for the S1000D <lcOrganizationalAnalysis> element.
 * 
 * Contains information about the client organization, including its vision, mission,
 * goals, and objectives.
 * 
 * Parent: <LcPerformanceAnalysis>
 * Children: <title>, <description>, <lcVisionStatement>, <lcMissionStatement>, etc.
 */
export default function LcOrganizationalAnalysis({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Organizational Analysis</h3>
      {children}
    </div>
  );
}