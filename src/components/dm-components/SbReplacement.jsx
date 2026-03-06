import React from 'react';

/**
 * Component for the S1000D <sbReplacement> element.
 * 
 * Contains information about the replacement condition of a new spare
 * versus the removed spare.
 * 
 * Parent: <SbInterchange>
 * Children: <sbCondition>, <SbAlteredToPart>, <replacedBy>, etc.
 */
export default function SbReplacement({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}