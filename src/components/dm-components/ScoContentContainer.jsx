import React from 'react';

/**
 * Component for the S1000D <scoContent> element.
 * 
 * This is the main container for SCORM (Sharable Content Object) content.
 * It can contain a description, a series of training steps, or a link to
 * an external SCO.
 * 
 * Parent: (content)
 * Children: <ContentDescription>, <TrainingStep>, <ExternalSco>
 */
export default function ScoContentContainer({ children }) {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
        Sharable Content Object
      </h1>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}