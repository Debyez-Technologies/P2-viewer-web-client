import React from 'react';

/**
 * Component for the S1000D <sbRemovedSpareDescr> element.
 * 
 * Contains the description of a removed spare part.
 * 
 * Parent: <SbIndividualRemovedSpare>
 * Children: <name>, <partRef>, <reqQuantity>, etc.
 */
export default function SbRemovedSpareDescr({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}