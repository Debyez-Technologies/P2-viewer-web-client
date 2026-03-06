import React from 'react';

/**
 * Component for the S1000D <crewDrillStep> element.
 * 
 * Renders a single, distinct step within a crew drill. This is a fundamental
 * building block of a procedure and often contains the core challenge-and-response
 * instructions.
 * 
 * Parent: <CrewDrill>, <SubCrewDrill>, or conditional elements like <if>
 * Children: <title>, <crewMemberGroup>, <challengeAndResponse>, <note>, etc.
 */
export default function CrewDrillStep({ attributes, children }) {
  return (
    <div className="flex items-start gap-4 my-4 py-2 border-b border-gray-200 last:border-b-0">
      {attributes.stepLabel && (
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
          {attributes.stepLabel}
        </div>
      )}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}