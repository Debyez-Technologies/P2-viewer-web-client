import React from 'react';

/**
 * Component for the S1000D <distributionPart> element.
 * 
 * Represents standard distribution parts like contacts and splices. This component
 * serves as a container for its properties.
 * 
 * Hierarchy:
 *   - wiringData
 *     - standardPartGroup
 *       - distributionPartGroup
 *         - distributionPart
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - contactSize (rendered as TextBlock)
 * - material (rendered as TextBlock)
 * - mass (rendered as TextBlock)
 * - wireColor (rendered as TextBlock)
 * - surfaceProtection (rendered as TextBlock)
 * - contactDiameter (rendered as TextBlock)
 * - temperature (Visible Component: Temperature)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function DistributionPart({ children }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Distribution Part</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}