import React from 'react';

/**
 * Component for the S1000D <challengeAndResponse> element.
 * 
 * This is a key component in crew procedures that lays out a challenge
 * (an action to be taken) and its corresponding response (a verbal
 * confirmation or observed state).
 * 
 * Parent: <CrewDrillStep>
 * Children: <challenge>, <crewMemberGroup>, <response>
 */
export default function ChallengeAndResponse({ children }) {
  return (
    <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start">
      {/* The children will be <Challenge> and <Response> components, 
          which will naturally fall into the two-column grid. */}
      {children}
    </div>
  );
}