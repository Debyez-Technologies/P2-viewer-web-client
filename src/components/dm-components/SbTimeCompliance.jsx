import React from 'react';

/**
 * Component for the S1000D <sbTimeCompliance> element.
 * 
 * Contains the limit to accomplish the Service Bulletin (basic limit, grace period, etc.).
 * 
 * Parent: <SbLimit>
 * Children: <limit>
 */
export default function SbTimeCompliance({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">Compliance:</span>
      <span>{children}</span>
    </div>
  );
}