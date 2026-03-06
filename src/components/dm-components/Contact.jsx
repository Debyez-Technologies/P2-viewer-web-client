import React from 'react';

/**
 * Component for the S1000D <contact> element.
 * 
 * Describes a single contact within a connector or equipment, identified by its
 * attributes. This component will likely display the attributes passed in `props.attributes`.
 * It has no children elements.
 * 
 * Attributes:
 * - contactIdent (required)
 * - contactFunction
 * - contactType
 * - connectedFlag
 * - contactPartNumber
 * - wireInstallationDirection
 */
export default function Contact({ attributes, children }) {
  return (
    <div className="flex items-center space-x-2 my-1 p-2 bg-gray-50 rounded border">
      <span className="font-mono text-sm font-bold text-indigo-700">Contact: {attributes.contactIdent}</span>
      {attributes.contactFunction && <span className="text-xs text-gray-600">({attributes.contactFunction})</span>}
    </div>
  );
}