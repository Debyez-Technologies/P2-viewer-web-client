import React from 'react';

/**
 * Component for the S1000D <accessPoint> element.
 * 
 * Describes an access point (panel, door, etc.) and provides details about it
 * based on the product configuration.
 * 
 * Parent: Structural <accessPointAlts>
 * Children: <name>, <shortName>, <zoneRef>, <fastener>, etc.
 */
export default function AccessPoint({ children }) {
  return (
    <div className="p-2 border-t first:border-t-0">
      {children}
    </div>
  );
}