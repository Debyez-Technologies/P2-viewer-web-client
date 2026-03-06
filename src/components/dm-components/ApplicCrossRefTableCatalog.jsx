import React from 'react';

/**
 * Component for the S1000D <applicCrossRefTableCatalog> element.
 * 
 * Contains the catalog for an ACT, which lists all ACT data modules in a project
 * and defines the relationships between different applicability sets.
 * 
 * Parent: <ApplicCrossRefTable>
 * Children: <applicCrossRefTableRef>, <ProductDefinitionRelationship>
 */
export default function ApplicCrossRefTableCatalog({ children }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        ACT Catalog
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}