import React from 'react';

/**
 * Component for the S1000D <externalCond> element.
 * 
 * Specifies a condition that is defined in another CCT data module.
 * This is primarily used in the context of an ACT/CCT catalog.
 * 
 * Parent: Structural <condList>
 * Children: <displayName> (TextBlock)
 */
export default function ExternalCond({ attributes, children }) {
  return (
    <div className="p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-600">
        External Condition: <span className="font-bold text-gray-800">{attributes.id}</span>
      </h3>
      <div className="mt-2 pl-4 text-gray-700">
        <p className="text-sm">Type Reference: {attributes.condTypeRefId}</p>
        {children}
      </div>
    </div>
  );
}