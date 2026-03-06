import React from 'react';

/**
 * Component for the S1000D <condIncorporation> element.
 * 
 * Represents a single technical condition that has been or is planned to be
 * incorporated. It links a condition ID to the documents it affects.
 * 
 * Parent: <IncorporationSection>
 * Children: <DocumentIncorporation>
 */
export default function CondIncorporation({ attributes, children }) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-bold text-gray-800">
        Condition: {attributes.condRefId}
        {attributes.condIssueNumber && ` (Issue ${attributes.condIssueNumber})`}
      </h3>
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
}