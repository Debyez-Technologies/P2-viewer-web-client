import React from 'react';

/**
 * Component for the S1000D <lcTrainingComponent> element.
 * 
 * Describes requirements for the support and logistics of a training intervention.
 * 
 * Parent: <LcTrainingInterventions>
 * Children: <title>, <description>, <lcTrainingType>, <lcDuration>, etc.
 */
export default function LcTrainingComponent({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Training Component</h3>
      {children}
    </div>
  );
}