import React from 'react';

/**
 * Component for the S1000D <response> element.
 * 
 * This component displays the "response" part of a challenge-and-response
 * pair. This is the expected verbal confirmation or observed result from
 * the crew member.
 * 
 * Parent: <ChallengeAndResponse>
 * Children: <para>, <figure>, <table>, etc.
 */
export default function Response({ children }) {
  // This component acts as the right-hand column in a challenge/response layout.
  return (
    <div className="md:col-span-1">
      {children}
    </div>
  );
}