import React from 'react';

/**
 * Component for the S1000D <zoneSpec> element.
 * 
 * Contains all associated properties of one zone. This is the main entry in a
 * zone repository.
 * 
 * Parent: Structural <zoneRepository>
 * Children: <zoneIdent> (Structural), <zoneAlts> (Structural), <refs>
 */
export default function ZoneSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
}