import React from 'react';

/**
 * Component for the S1000D <applicSpec> element.
 * 
 * Represents a single, externalized applicability annotation.
 * 
 * Parent: Structural <applicRepository>
 * Children: <applicSpecIdent> (Structural), <refs>
 */
export default function ApplicSpec({ attributes, children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h3 className="font-bold text-lg">Applicability Annotation: {attributes.applicMapRefId}</h3>
      <div className="mt-2 pl-4">{children}</div>
    </div>
  );
}