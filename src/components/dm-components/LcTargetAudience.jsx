import React from 'react';

/**
 * Component for the S1000D <lcTargetAudience> element.
 * 
 * Defines the student characteristics for a training intervention.
 * 
 * Parent: <LcTrainingInterventions>
 * Children: <title>, <description>, <lcCurrentEntryBehaviors>, etc.
 */
export default function LcTargetAudience({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Target Audience</h3>
      {children}
    </div>
  );
}