import React from 'react';

/**
 * Component for the S1000D <sbAvailability> element.
 * 
 * Describes the lead time required to obtain a material set or individual material.
 * 
 * Parent: Structural <sbProcurementInfo>
 * Children: <noInfo>, <quantity>, <footnoteRemarks>
 */
export default function SbAvailability({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">Availability:</span>
      <span>{children}</span>
    </div>
  );
}