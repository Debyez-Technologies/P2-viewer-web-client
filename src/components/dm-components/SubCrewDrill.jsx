import React from 'react';

/**
 * Component for the S1000D <subCrewDrill> element.
 * 
 * Represents a nested or sub-procedure within a main crew drill. It is
 * structurally similar to a <crewDrill> but is typically rendered with
 * less emphasis to show its subordinate nature.
 * 
 * Parent: <CrewDrill>
 * Children: <title>, <crewMemberGroup>, <para>, <crewDrillStep>, etc.
 */
export default function SubCrewDrill({ children }) {
  return (
    <div className="mt-4 p-3 border border-gray-200 rounded-md bg-gray-50">
      {children}
    </div>
  );
}