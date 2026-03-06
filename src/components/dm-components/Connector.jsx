import React from 'react';

/**
 * Component for the S1000D <connector> element.
 * 
 * This component displays information about a specific connector, terminal module,
 * switch, or relay used in the wiring. It serves as a major grouping for 
 * connector-specific details.
 * 
 * Hierarchy:
 *   - wiringData
 *     - standardPartGroup
 *       - connectorGroup
 *         - connector
 * 
 * Potential Children:
 * - partNumber (rendered as TextBlock)
 * - altIdentGroup (Structural)
 * - mass (rendered as TextBlock)
 * - orientation (rendered as TextBlock)
 * - assyInstruction (Structural)
 * - rack (rendered as TextBlock)
 * - contactCount (rendered as TextBlock)
 * - contactDescrGroup (Structural)
 * - electricalLogic (Visible Component: ElectricalLogic)
 * - connectorAccessories (Structural)
 * - functionalDescrRef (Visible Component: FunctionalDescrRef)
 * - illustrationRef (Visible Component: IllustrationRef - assuming it exists)
 */
export default function Connector({ children }) {
  return (
    <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 my-2 shadow-md">
      <h3 className="text-xl font-bold text-blue-800 mb-2 border-b-2 border-blue-200 pb-2">Connector</h3>
      <div className="pl-4">
        {children}
      </div>
    </div>
  );
}