import React from 'react';

/**
 * Component for the S1000D <lcTechnicalRqmts> element.
 * 
 * Contains technical requirements for how learning content is delivered.
 * 
 * Parent: <LcTrainingInterventions>
 * Children: <title>, <description>, <lcBrowsers>, <lcLms>, etc.
 */
export default function LcTechnicalRqmts({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Technical Requirements</h3>
      {children}
    </div>
  );
}