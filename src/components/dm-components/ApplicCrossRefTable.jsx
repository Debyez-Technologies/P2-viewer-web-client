import React from 'react';

/**
 * Component for the S1000D <applicCrossRefTable> element.
 * 
 * This is the main container for an Applicability Cross-reference Table (ACT)
 * data module. It contains either the catalog of ACTs or the definition of
 * product attributes for the current ACT.
 * 
 * Parent: (content)
 * Children: <ApplicCrossRefTableCatalog> or <ProductAttributeList>
 */
export default function ApplicCrossRefTable({ children }) {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 font-sans">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-teal-500 pb-2 mb-6">
        Applicability Cross-Reference Table
      </h1>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}