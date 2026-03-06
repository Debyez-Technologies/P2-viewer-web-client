import React from 'react';

/**
 * Component for the S1000D <wireMaterial> element.
 * 
 * Contains detailed properties of the material a wire is made from, such as
 * part number, gauge, color, resistance, etc. This is essentially a "spec sheet"
 * for a type of wire.
 * 
 * Hierarchy:
 *   - wiringData
 *     - standardPartGroup
 *       - wireMaterialGroup
 *         - wireMaterial
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - wireCode (Structural)
 * - numberOfCores, size, mass, wireColor, outerJacketColor, outerDiameter,
 *   resistance, voltage, amperage, screenCount, coaxialCableFlag, 
 *   triaxialCableFlag (all rendered as TextBlock)
 * - temperature (Visible Component: Temperature)
 * - frequencyCharacteristics (Visible Component: FrequencyCharacteristics)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function WireMaterial({ children }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Wire Material Specification</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}