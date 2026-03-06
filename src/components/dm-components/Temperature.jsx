import React from 'react';

/**
 * Component for the S1000D <temperature> element.
 * 
 * Describes the minimum and maximum temperature rating for an item
 * (e.g., harness, distribution part, wire material).
 * 
 * Potential Children:
 * - minTemperature (rendered as TextBlock)
 * - maxTemperature (rendered as TextBlock)
 */
export default function Temperature({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold text-sm">Temp Rating:</span>
      {children}
    </div>
  );
}