import React from 'react';

/**
 * Component for the S1000D <externalProductAttribute> element.
 * 
 * Specifies a product attribute that is defined in another ACT data module.
 * This is primarily used in the context of an ACT catalog.
 * 
 * Parent: <ProductAttributeList>
 * Children: <displayName> (TextBlock)
 */
export default function ExternalProductAttribute({ attributes, children }) {
  return (
    <div className="p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-600">
        External Attribute: <span className="font-bold text-gray-800">{attributes.id}</span>
      </h3>
      <div className="mt-2 pl-4 text-gray-700">
        {children}
      </div>
    </div>
  );
}