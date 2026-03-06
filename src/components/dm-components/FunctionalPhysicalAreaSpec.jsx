import React from 'react';

/**
 * Component for the S1000D <functionalPhysicalAreaSpec> element.
 * 
 * Contains the associated properties of one functional and/or physical area,
 * as defined by the Standard Numbering System (SNS).
 * 
 * Parent: Structural <functionalPhysicalAreaRepository>
 * Children: <functionalPhysicalAreaIdent> (Structural), <name>, <shortName>, etc.
 */
export default function FunctionalPhysicalAreaSpec({ children }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* The backend should process <functionalPhysicalAreaIdent> and pass its SNS code
          as a prop, which could be used as a title here. */}
      {children}
    </div>
  );
}