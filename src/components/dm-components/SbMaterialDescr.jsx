import React from 'react';

/**
 * Component for the S1000D <sbMaterialDescr> element.
 * 
 * Contains a reference to a material set or individual material required
 * for the Service Bulletin.
 * 
 * Parent: <SbMaterialSet>
 * Children: <sbMaterialSetRef>, <reqQuantity>, <footnoteRemarks>
 */
export default function SbMaterialDescr({ children }) {
  return (
    <div className="p-2">
      {children}
    </div>
  );
}