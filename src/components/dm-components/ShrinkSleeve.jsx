import React from 'react';

/**
 * Component for the S1000D <shrinkSleeve> element.
 * 
 * Contains properties of shrink sleeves used in the wiring.
 * 
 * Hierarchy:
 *   - wiringData
 *     - standardPartGroup
 *       - shrinkSleeveGroup
 *         - shrinkSleeve
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - size (rendered as TextBlock)
 * - mass (rendered as TextBlock)
 * - wireColor (rendered as TextBlock)
 * - sleeveDiameter (Visible Component: SleeveDiameter)
 * - temperature (Visible Component: Temperature)
 * - harnessSize (Visible Component: HarnessSize)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function ShrinkSleeve({ children }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Shrink Sleeve</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}