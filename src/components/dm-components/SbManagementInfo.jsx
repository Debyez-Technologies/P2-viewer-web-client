import React from 'react';

/**
 * Component for the S1000D <sbManagementInfo> element.
 * 
 * Contains metadata for managing the Service Bulletin, including compliance,
 * task types, impact lists, and time assessments.
 * 
 * Parent: <ServiceBulletin>
 * Children: <commonInfo>, <sbCompliance>, <sbImpactList>, <SbTimeAssessment>, etc.
 */
export default function SbManagementInfo({ children }) {
  return (
    <section className="p-4 my-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">
        Management Information
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}