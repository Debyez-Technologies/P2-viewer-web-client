import React from 'react';

/**
 * Component for the S1000D <scormContentPackageStatus> element.
 * 
 * This component is a major section that contains the status and metadata
 * for the SCORM content package, such as security, applicability, and references.
 * 
 * Parent: (identAndStatusSection)
 * Children: <security>, <applic>, <brexDmRef>, etc.
 */
export default function ScormContentPackageStatusSection({ children }) {
  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Status Information</h2>
      {children}
    </div>
  );
}