import React from 'react';

/**
 * Component for the S1000D <challenge> element.
 * 
 * This component displays the "challenge" part of a challenge-and-response
 * pair, which is the action or check a crew member is instructed to perform.
 * 
 * Parent: <ChallengeAndResponse>
 * Children: <para>, <figure>, <table>, etc.
 */
export default function Challenge({ children }) {
  // This component acts as the left-hand column in a challenge/response layout.
  return (
    <div className="md:col-span-1">
      {children}
    </div>
  );
}