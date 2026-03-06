import React from 'react';

/**
 * Component for the S1000D <sleeveDiameter> element.
 * 
 * Contains the minimum and maximum diameter of a solder or shrink sleeve.
 * 
 * Potential Children:
 * - minDiameter (rendered as TextBlock)
 * - maxDiameter (rendered as TextBlock)
 */
export default function SleeveDiameter({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold text-sm">Sleeve Diameter:</span>
      {children}
    </div>
  );
}