import React from 'react';

/**
 * Component for the S1000D <accessory> element.
 * 
 * An accessory is a standard part used in the Product's wiring. This component
 * acts as a container for its properties.
 * 
 * Hierarchy:
 *   - wiringData
 *     - standardPartGroup
 *       - accessoryGroup
 *         - accessory
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - mass (rendered as TextBlock)
 * - orientation (rendered as TextBlock)
 * - assyInstruction (Structural)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function Accessory({ children }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Accessory</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}