import React from 'react';

/**
 * Component for the S1000D <sbInterchange> element.
 * 
 * Provides information about the interchangeability of a removed part
 * with its replacement.
 * 
 * Parent: <SbIndividualRemovedSpare>
 * Children: <SbReplacement>, <footnoteRemarks>
 */
export default function SbInterchange({ children }) {
  return (
    <div className="mt-2 p-2 bg-gray-50 rounded-md">
      <h4 className="font-semibold">Interchangeability:</h4>
      {children}
    </div>
  );
}