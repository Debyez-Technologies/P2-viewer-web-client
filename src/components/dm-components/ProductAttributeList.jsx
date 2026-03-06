import React from 'react';

/**
 * Component for the S1000D <productAttributeList> element.
 * 
 * A container for a list of product attributes. These attributes define the
 * characteristics of a product that do not typically change over its service life.
 * 
 * Parent: <ApplicCrossRefTable>
 * Children: <ProductAttribute>, <ExternalProductAttribute>
 */
export default function ProductAttributeList({ children }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Product Attributes
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}