import React from 'react';

/**
 * Component for the S1000D <sbMaterialSet> element.
 * 
 * Lists references and quantities for a set of materials required for the SB.
 * 
 * Parent: <SbMaterialSetList>
 * Children: <name>, <sbProcurementInfo>, <SbMaterialDescr>, etc.
 */
export default function SbMaterialSet({ children }) {
  return (
    <div className="p-3 border rounded-md">
      {children}
    </div>
  );
}