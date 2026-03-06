import React from 'react';

/**
 * Component for the S1000D <lcPerformerAnalysis> element.
 * 
 * Contains information about the workforce, such as job titles, education levels,
 * skills, and knowledge.
 * 
 * Parent: <LcPerformanceAnalysis>
 * Children: <title>, <description>, <lcJobTitle>, <lcJobCode>, etc.
 */
export default function LcPerformerAnalysis({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Performer Analysis</h3>
      {children}
    </div>
  );
}