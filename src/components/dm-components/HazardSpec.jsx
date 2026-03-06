import React from 'react';

/**
 * Component for the S1000D <hazardSpec> element.
 * 
 * Represents one complete, reusable hazard type entry in a repository. This includes
 * the hazard identifier, its symbol, class, and safety information.
 * 
 * Parent: Structural <hazardRepository>
 * Children: <hazardIdent> (Structural), <symbol>, <hazardousClass>, <safetyInformation>
 */
export default function HazardSpec({ children }) {
  return (
    <div className="p-4 border-2 border-red-500 rounded-lg bg-red-50 shadow-sm">
      {/* The backend should process <hazardIdent> and pass its number as a prop.
          Children will contain the descriptive content of the hazard. */}
      {children}
    </div>
  );
}