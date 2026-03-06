import React from 'react';

/**
 * Component for the S1000D <sbMaterialSetList> element.
 * 
 * Contains the full list of material sets (or individual/external materials)
 * required for the Service Bulletin.
 * 
 * Parent: Structural <sbMaterialInfoContent>
 * Children: <noInfo>, <SbMaterialSet>, <para>, <note>
 */
export default function SbMaterialSetList({ children }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-700">Material Sets</h3>
      <div className="mt-2 space-y-4">{children}</div>
    </div>
  );
}