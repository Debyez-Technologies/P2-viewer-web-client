import React from 'react';

/**
 * Component for the S1000D <warningSpec> element.
 * 
 * Represents one complete, reusable warning entry in a repository. It is
 * visually distinct to highlight potential danger to personnel.
 * 
 * Parent: Structural <warningRepository>
 * Children: <warningIdent> (Structural), <symbol>, <warningAndCautionPara>
 */
export default function WarningSpec({ children }) {
  return (
    <div className="p-4 border-2 border-red-600 rounded-lg bg-red-100 shadow-sm">
      {/* The backend should process <warningIdent> and pass its number as a prop.
          Children will contain the symbol and descriptive content of the warning. */}
      {children}
    </div>
  );
}