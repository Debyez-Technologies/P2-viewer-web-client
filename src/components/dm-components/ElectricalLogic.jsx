import React from 'react';

/**
 * Component for the S1000D <electricalLogic> element.
 * 
 * Provides a container for describing electrical states and internal connections
 * for complex equipment like switches or relays.
 * 
 * Hierarchy:
 *   - electricalEquip or connector
 *     - electricalLogic
 * 
 * Potential Children:
 * - electricalEquipState (Structural)
 */
export default function ElectricalLogic({ children }) {
  return (
    <div className="border-l-4 border-yellow-400 pl-4 my-2">
      <h4 className="font-semibold text-gray-700 italic">Electrical Logic:</h4>
      <div className="pl-2">
        {children}
      </div>
    </div>
  );
}