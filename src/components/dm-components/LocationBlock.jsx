import React from 'react';

/**
 * Component for the S1000D <location> element.
 * 
 * Specifies the location of a functional item or circuit breaker, usually
 * by referencing a zone or access point.
 * 
 * Parent: <FunctionalItem>, <CircuitBreaker>
 * Children: <zoneRef>, <accessPointRef>, <installationLocation>
 */
export default function LocationBlock({ children }) {
  return (
    <div className="mt-2">
      <h4 className="font-semibold text-gray-600">Location:</h4>
      <div className="pl-2">{children}</div>
    </div>
  );
}