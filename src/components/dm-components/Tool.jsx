import React from 'react';

/**
 * Component for the S1000D <tool> element.
 * 
 * Describes a piece of support equipment and provides further information
 * related to it based on product configuration.
 * 
 * Parent: Structural <toolAlts>
 * Children: <itemDescr>, <rcmdQuantity>, <packaging>, etc.
 */
export default function Tool({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}