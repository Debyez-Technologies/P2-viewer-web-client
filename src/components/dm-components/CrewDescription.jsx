import React from 'react';

/**
 * Component for the S1000D <descrCrew> element.
 * 
 * A container for general descriptive information for crew or operators,
 * typically consisting of paragraphs, notes, warnings, and figures.
 * 
 * Parent: Structural <crew> element
 * Children: <levelledPara>, <note>, <warning>, <caution>, <figure>, etc.
 */
export default function CrewDescription({ children }) {
  return (
    <div className="prose max-w-none">
      {children}
    </div>
  );
}