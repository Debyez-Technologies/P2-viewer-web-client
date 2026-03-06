import React from 'react';

/**
 * Component for the S1000D <sbAlteredToPart> element.
 * 
 * Contains the new part number given to a part after it has been modified and
 * is ready to be re-installed.
 * 
 * Parent: <SbReplacement>
 * Children: <partRef>, <catalogSeqNumberRef>, <sbAlteredToPartDescr> (TextBlock)
 */
export default function SbAlteredToPart({ children }) {
  return (
    <div className="p-2 my-1">
      <h4 className="font-semibold">Altered To Part:</h4>
      <div className="pl-4">{children}</div>
    </div>
  );
}