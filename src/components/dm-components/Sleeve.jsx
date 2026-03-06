import React from 'react';

/**
 * Component for the S1000D <sleeve> element.
 * 
 * Contains information about a harness sleeve.
 * 
 * Attributes:
 * - sleeveMaterial
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 */
export default function Sleeve({ attributes, children }) {
  return (
    <div className="flex items-baseline space-x-2 my-1">
      <span className="font-semibold">Sleeve:</span>
      <span>{children}</span>
      {attributes.sleeveMaterial && <span className="text-sm text-gray-500">({attributes.sleeveMaterial})</span>}
    </div>
  );
}