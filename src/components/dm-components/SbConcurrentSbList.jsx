import React from 'react';

/**
 * Component for the S1000D <sbConcurrentSbList> element.
 * 
 * Contains a list of Service Bulletins that have a concurrency relationship
 * (e.g., must be done before, or at the same time) with the current SB.
 * 
 * Parent: <SbManagementInfo>
 * Children: <noInfo>, <SbConcurrentSbInfo>
 */
export default function SbConcurrentSbList({ children }) {
  return (
    <div className="p-3 my-2 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700">Concurrent Service Bulletins</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}