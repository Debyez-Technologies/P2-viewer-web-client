import React from 'react';

/**
 * Component for the S1000D <productAttribute> element.
 * 
 * Displays the detailed definition of a single product attribute, such as
 * "serial number" or "model". It includes its name, description, and
 * any enumerated values.
 * 
 * Parent: <ProductAttributeList>
 * Children: <name>, <displayName>, <descr>, <prompt>, <enumeration> (Metadata)
 */
export default function ProductAttribute({ attributes, children }) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800">{attributes.id}</h3>
        <div className="flex space-x-2">
          {attributes.valueDataType && (
            <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">
              {attributes.valueDataType}
            </span>
          )}
          {attributes.productIdentifier && attributes.productIdentifier !== 'no' && (
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {attributes.productIdentifier.toUpperCase()} IDENTIFIER
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2">
        {children}
      </div>
    </div>
  );
}