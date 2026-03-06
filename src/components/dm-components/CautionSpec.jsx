import React from 'react';

/**
 * Component for the S1000D <cautionSpec> element.
 * 
 * Represents one complete, reusable caution entry in a repository.
 * 
 * Parent: Structural <cautionRepository>
 * Children: <cautionIdent> (Structural), <symbol>, <warningAndCautionPara>
 */
export default function CautionSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* The backend should process <cautionIdent> and pass its number as a prop.
          For now, we render children which will be the caution paragraph. */}
      {children}
    </div>
  );
}