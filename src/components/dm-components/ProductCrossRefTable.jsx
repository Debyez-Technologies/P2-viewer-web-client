import React from 'react';

/**
 * Component for the S1000D <productCrossRefTable> element.
 * 
 * This is the main container for a Product Cross-reference Table (PCT) data module.
 * It contains a list of specific, identifiable product instances.
 * 
 * Parent: (content)
 * Children: <Product>
 */
export default function ProductCrossRefTable({ children }) {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 font-sans">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-green-500 pb-2 mb-6">
        Product Cross-Reference Table
      </h1>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}