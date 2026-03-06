import React from 'react';

/**
 * Component for the S1000D <fastener> element.
 * 
 * Stores information about access point fasteners, including type and quantity.
 * 
 * Parent: <AccessPoint>
 * Children: <fastenerType> (TextBlock), <fastenerQuantity> (TextBlock)
 */
export default function FastenerInfo({ children }) {
  return (
    <div className="mt-2">
      <h4 className="text-sm font-semibold text-gray-600">Fasteners:</h4>
      <div className="pl-4 text-sm">{children}</div>
    </div>
  );
}