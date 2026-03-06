import React from 'react';

/**
 * Component for the S1000D <accessFrom> element.
 * 
 * Specifies the zone(s) and/or access point(s) from which a functional item can be reached.
 * 
 * Parent: <FunctionalItem>
 * Children: <zoneRef>, <accessPointRef>
 */
export default function AccessFromBlock({ children }) {
  return (
    <div className="mt-2 pl-4">
      <h4 className="font-semibold text-gray-600">Access From:</h4>
      <div className="pl-2">{children}</div>
    </div>
  );
}