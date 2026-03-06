import React from 'react';

/**
 * Component for the S1000D <sbOriginalIssueDate> element.
 * 
 * Displays the first issue date of the Service Bulletin.
 * 
 * Parent: <SbManagementInfo>
 * Children: <issueDate>
 */
export default function SbOriginalIssueDate({ children }) {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold">Original Issue Date:</span>
      <span>{children}</span>
    </div>
  );
}