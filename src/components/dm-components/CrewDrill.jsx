import React from 'react';

/**
 * Component for the S1000D <crewDrill> element.
 * 
 * Represents a major procedure or drill to be performed by the crew.
 * It serves as a container for the drill's title, introductory text,
 * and a series of steps.
 * 
 * Parent: <CrewRefCard> or <levelledPara>
 * Children: <title>, <crewMemberGroup>, <para>, <crewDrillStep>, etc.
 */
export default function CrewDrill({ children }) {
  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md">
      {children}
    </div>
  );
}