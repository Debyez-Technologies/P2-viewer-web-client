import React from 'react';

/**
 * Component for the S1000D <sbAccomplishmentInstructions> element.
 * 
 * The main section containing the step-by-step instructions or references
 * to the procedural data modules needed to perform the work.
 * 
 * Parent: <ServiceBulletin>
 * Children: <mainProcedure>, <para>, <refs>
 */
export default function SbAccomplishmentInstructions({ children }) {
  return (
    <section className="p-4 my-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4 border-b pb-2">
        Accomplishment Instructions
      </h2>
      {children}
    </section>
  );
}