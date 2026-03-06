import React from 'react';

/**
 * Component for the S1000D <terminologySpec> element.
 * 
 * Contains a complete term/definition pair, forming a single entry in a
 * terminology repository (glossary).
 * 
 * Parent: Structural <terminologyRepository>
 * Children: <terminologyIdent> (Structural), <terminologyTerm> (TextBlock), 
 *           <terminologyDefinition> (Structural)
 */
export default function TerminologySpec({ children }) {
  // The children will be the term (TextBlock) and the definition paragraph.
  // A more advanced implementation could separate these based on their type.
  return (
    <div className="p-4 border-b last:border-b-0">
      {children}
    </div>
  );
}