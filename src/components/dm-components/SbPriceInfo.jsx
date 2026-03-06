import React from 'react';

/**
 * Component for the S1000D <sbPriceInfo> element.
 * 
 * Contains the cost of the material set or individual material.
 * 
 * Parent: Structural <sbProcurementInfo>
 * Children: <noInfo>, <quantity>, <footnoteRemarks>
 */
export default function SbPriceInfo({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">Price:</span>
      <span>{children}</span>
    </div>
  );
}