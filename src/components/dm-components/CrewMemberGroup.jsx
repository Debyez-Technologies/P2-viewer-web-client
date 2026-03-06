import React from 'react';

/**
 * Component for the S1000D <crewMemberGroup> element.
 * 
 * A container that lists one or more crew members who are responsible for
 * performing a specific action or step.
 * 
 * Parent: <ChallengeAndResponse>, <CrewDrillStep>, <CrewDrill>
 * Children: <crewMember>
 */
export default function CrewMemberGroup({ children }) {
  return (
    <div className="my-2">
      {children}
    </div>
  );
}