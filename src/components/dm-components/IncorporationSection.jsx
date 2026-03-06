import React from 'react';

/**
 * Component for the S1000D <incorporation> element.
 * 
 * A container for documenting the incorporation status of various technical
 * conditions into the technical documentation.
 * 
 * Parent: <CondCrossRefTable>
 * Children: <CondIncorporation>
 */
export default function IncorporationSection({ children }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Incorporation Status
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}