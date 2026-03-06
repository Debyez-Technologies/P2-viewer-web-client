import React from 'react';

/**
 * Component for the S1000D <identSleeve> element.
 * 
 * Contains properties of identification sleeves used in the wiring.
 * 
 * Hierarchy:
 *   - wiringData
 *     - standardPartGroup
 *       - identSleeveGroup
 *         - identSleeve
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - length (Visible Component: Length)
 * - material (rendered as TextBlock)
 * - mass (rendered as TextBlock)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function IdentSleeve({ children }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Identification Sleeve</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}