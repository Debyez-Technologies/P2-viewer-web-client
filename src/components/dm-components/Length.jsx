import React from 'react';

/**
 * Component for the S1000D <length> element.
 * 
 * Contains length information for a wire, solder sleeve, or identification sleeve.
 * The value is passed as a child (TextBlock), and attributes provide context.
 * 
 * Attributes:
 * - unitOfMeasure
 * - wireLengthType (e.g., "critical", "estimated", "final")
 */
export default function Length({ attributes, children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">Length:</span>
      <span>{children}</span>
      {attributes.unitOfMeasure && <span className="text-sm text-gray-500">{attributes.unitOfMeasure}</span>}
      {attributes.wireLengthType && <span className="text-sm text-gray-500">({attributes.wireLengthType})</span>}
    </div>
  );
}