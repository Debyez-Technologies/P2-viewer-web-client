import React from 'react';

/**
 * Component for the S1000D <condCrossRefTable> element.
 * 
 * This is the main container for a Condition Cross-reference Table (CCT)
 * data module. It organizes the lists of condition types, specific conditions,
 * and their incorporation status.
 * 
 * Parent: (content)
 * Children: <condTypeList> (Structural), <condList> (Structural), <IncorporationSection>
 */
export default function CondCrossRefTable({ children }) {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 font-sans">
      <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-purple-500 pb-2 mb-6">
        Condition Cross-Reference Table
      </h1>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}