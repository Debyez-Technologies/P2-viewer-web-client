import React from 'react';

/**
 * Component for the S1000D <condType> element.
 * 
 * Defines a single, reusable type of condition (e.g., "Software Version").
 * It includes a name, description, and potentially a list of allowed values.
 * 
 * Parent: Structural <condTypeList>
 * Children: <name>, <descr>, <enumeration> (Metadata)
 */
export default function CondType({ attributes, children }) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800">{attributes.id}</h3>
        {attributes.valueDataType && (
          <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">
            {attributes.valueDataType}
          </span>
        )}
      </div>
      <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2">
        {children}
      </div>
    </div>
  );
}