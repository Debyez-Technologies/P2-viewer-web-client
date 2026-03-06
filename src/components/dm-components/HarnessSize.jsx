import React from 'react';

/**
 * Component for the S1000D <harnessSize> element.
 * 
 * Describes the minimum and maximum size of a harness to which a shrink sleeve
 * can be applied.
 * 
 * Hierarchy:
 *   - shrinkSleeve
 *     - harnessSize
 * 
 * Potential Children:
 * - minHarnessSize (rendered as TextBlock)
 * - maxHarnessSize (rendered as TextBlock)
 */
export default function HarnessSize({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold text-sm">Harness Size:</span>
      {children}
    </div>
  );
}