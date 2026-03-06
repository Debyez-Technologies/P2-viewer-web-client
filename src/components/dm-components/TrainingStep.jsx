import React from 'react';

/**
 * Component for the S1000D <trainingStep> element.
 * 
 * A container for a distinct section of training content presented as a unit.
 * It can include its own description, references to data modules, and extra
 * resources like figures or tables.
 * 
 * Parent: <ScoContentContainer>
 * Children: <ContentDescription>, <dmRef>, <dmSegmentRef>, and children from
 *           the structural <extraResources> element (e.g., <figure>, <table>).
 */
export default function TrainingStep({ children }) {
  return (
    <section className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      {children}
    </section>
  );
}