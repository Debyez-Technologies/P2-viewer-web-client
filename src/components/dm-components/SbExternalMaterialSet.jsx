import React from 'react';

/**
 * A reusable component for rendering external material references.
 * Used for:
 * - <sbExternalSpareSet>
 * - <sbExternalSupportEquipSet>
 * - <sbExternalSupplySet>
 * 
 * @param {object} props
 * @param {string} props.name - The original S1000D tag name.
 * @param {React.ReactNode} props.children - The child components, typically <refs>.
 */
export default function SbExternalMaterialSet({ children }) {
  return (
    <div className="p-3 border rounded-md bg-gray-50 italic">
      <p className="font-semibold not-italic">External Material Reference:</p>
      {children}
    </div>
  );
}