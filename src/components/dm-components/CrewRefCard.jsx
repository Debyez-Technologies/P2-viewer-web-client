import React from 'react';

/**
 * Component for the S1000D <crewRefCard> element.
 * 
 * This is a top-level container for a "reference card," which typically
 * holds a set of related crew drills or procedures (e.g., an emergency
 * checklist).
 * 
 * Parent: Structural <crew> element
 * Children: <title>, <para>, <crewDrill>, etc.
 */
export default function CrewRefCard({ children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {children}
    </div>
  );
}