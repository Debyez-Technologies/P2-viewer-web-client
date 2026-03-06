import React from 'react';

/**
 * Component for the S1000D <accessPointSpec> element.
 * 
 * A container for all properties of a single access point. It is the main entry
 * in an access point repository.
 * 
 * Parent: Structural <accessPointRepository>
 * Children: <accessPointIdent> (Structural), <accessPointAlts> (Structural), <refs>
 */
export default function AccessPointSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* The backend should process <accessPointIdent> and pass its number as a prop,
          but for now, we render the children which will include the name etc. */}
      {children}
    </div>
  );
}