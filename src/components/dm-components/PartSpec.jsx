import React from 'react';

/**
 * Component for the S1000D <partSpec> element.
 * 
 * Contains all the associated properties for a single part number.
 * 
 * Parent: Structural <partRepository>
 * Children: <partIdent> (Structural), <itemIdentData>, <procurementData>, <techData>
 */
export default function PartSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}