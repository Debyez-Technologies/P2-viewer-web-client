import React from 'react';

/**
 * Component for the S1000D <sbMaterialInfo> element.
 * 
 * Contains information about materials required for the Service Bulletin,
 * either directly within its structure or by referencing other data modules.
 * 
 * Parent: <ServiceBulletin>
 * Children: <sbMaterialInfoContent>, <para>, <refs>
 */
export default function SbMaterialInfo({ children }) {
  return (
    <section className="p-4 my-4 bg-green-50 border border-green-200 rounded-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-4 border-b pb-2">
        Material Information
      </h2>
      {children}
    </section>
  );
}