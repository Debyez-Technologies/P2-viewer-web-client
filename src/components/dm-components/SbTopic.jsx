import React from 'react';

/**
 * Component for the S1000D <sbTopic> element.
 * 
 * A container for a specific topic within a descriptive section of the Service Bulletin.
 * It always contains a title and its associated content.
 * 
 * Parent: <SbSection> (e.g., <sbSummary>, <sbPlanningInfo>)
 * Children: <title>, <sbTopicContent> (Structural)
 */
export default function SbTopic({ children }) {
  return (
    <div className="prose max-w-none">
      {/* Expects a title (rendered as a TextBlock heading) and content (paras, tables, etc.) */}
      {children}
    </div>
  );
}