import React from 'react';

/**
 * Component for the S1000D <sb> element.
 * 
 * This is the root container for all content within a Service Bulletin data module.
 * It organizes the main topics of the SB, such as management info, summary,
 * planning, materials, and accomplishment instructions.
 * 
 * Parent: (content)
 * Children: <SbManagementInfo>, <SbRevisionInfo>, <SbSummary>, <SbPlanningInfo>, 
 *           <SbMaterialInfo>, <SbAccomplishmentInstructions>, <SbAdditionalInfo>, etc.
 */
export default function ServiceBulletin({ children }) {
  return (
    <article className="p-4 sm:p-6 bg-white font-sans">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-red-500 pb-2 mb-6">
        Service Bulletin
      </h1>
      <div className="space-y-8">
        {children}
      </div>
    </article>
  );
}