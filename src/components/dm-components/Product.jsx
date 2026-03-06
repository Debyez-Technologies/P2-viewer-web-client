import React from 'react';

/**
 * Component for the S1000D <product> element.
 * 
 * Represents a single, unique product instance (e.g., a specific aircraft).
 * Its defining characteristics are provided by a series of <assign> elements in the XML,
 * which are processed by the backend and passed to this component as an 'assignments' prop.
 * 
 * This component does not render children directly, as <assign> is metadata.
 * 
 * Parent: <ProductCrossRefTable>
 * Children: None (data is passed via props)
 * 
 * Expected Props:
 * - assignments: An array of objects, where each object represents an <assign> element.
 *   Example: [{ ident: 'serialNumber', type: 'prodattr', value: 'XYZ-123' }, ...]
 */
export default function Product({ assignments }) {
  // Find a primary identifier for the title, like a serial number or registration.
  const primaryIdentifier = assignments?.find(a => a.ident.toLowerCase().includes('serial') || a.ident.toLowerCase().includes('reg')) || assignments?.[0];

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-bold text-gray-800">
        Product Instance: 
        <span className="ml-2 font-mono text-blue-700">{primaryIdentifier?.value || 'N/A'}</span>
      </h3>
      <div className="mt-4">
        <dl>
          {assignments && assignments.map((assign, index) => (
            <div key={index} className="px-4 py-2 grid grid-cols-3 gap-4 odd:bg-gray-50">
              <dt className="text-sm font-medium text-gray-500">{assign.ident} ({assign.type})</dt>
              <dd className="text-sm text-gray-900 col-span-2 font-mono">{assign.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}