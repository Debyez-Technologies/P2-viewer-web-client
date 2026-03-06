import React from 'react';

/**
 * Component for the S1000D <conduit> element.
 * 
 * A conduit is a standard part used to protect or route wiring. This component
 * displays its properties.
 * 
 * Hierarchy:
 *   - wiringData
 *     - standardPartGroup
 *       - conduitGroup
 *         - conduit
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - size (rendered as TextBlock)
 * - mass (rendered as TextBlock)
 * - wireColor (rendered as TextBlock)
 * - wallThickness (rendered as TextBlock)
 * - temperature (Visible Component: Temperature)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function Conduit({ children }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Conduit</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}